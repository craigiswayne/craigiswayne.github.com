// Import the 'extract-zip' library
const extract = require('extract-zip');

// Import 'path' for resolving paths
const path = require('path');

// Import 'fs/promises' for asynchronous file system operations
const fs = require('node:fs/promises');

// --- NEW DEPENDENCY ---
// Import the 'ignore' library to handle .figmaignore rules
// Run: npm install ignore
const { Ignore } = require('ignore');
// --- END NEW DEPENDENCY ---

// --- Configuration ---
const INTERMEDIATE_FOLDER = path.resolve(__dirname, 'figma_extracted_files');
// --- End of Configuration ---

/**
 * Extracts a zip file.
 * (This function is unchanged)
 */
async function extract_zip_archive(source_file, target_dir) {
    console.log(`Starting extraction of: ${source_file}`);
    await extract(source_file, { dir: target_dir });
    console.log(`✅ Extraction complete. Files are in: ${target_dir}`);
}

/**
 * Recursively copies files from a source directory to a destination.
 * (This function is unchanged, used as a fast-path if no .figmaignore exists)
 */
async function copy_files_recursively(source_dir, destination_dir) {
    console.log(`Starting recursive copy from: ${source_dir}`);
    await fs.cp(source_dir, destination_dir, { recursive: true });
    console.log(`✅ Successfully copied files to: ${destination_dir}`);
}

// --- NEW FUNCTION ---
/**
 * Recursively copies files, respecting .figmaignore rules.
 *
 * @param {string} root_source - The absolute path to the root source folder (e.g., INTERMEDIATE_FOLDER).
 * @param {string} root_destination - The absolute path to the root destination folder.
 * @param {Ignore} ig - An 'ignore' instance pre-loaded with rules.
 */
async function copy_with_ignore(root_source, root_destination, ig) {
    console.log('Starting recursive copy with ignore rules...');

    // We define an internal 'walk' function to handle the recursion
    async function walk(current_source) {
        // Read all entries (files/dirs) in the current directory
        const entries = await fs.readdir(current_source, { withFileTypes: true });

        for (const entry of entries) {
            const source_path = path.join(current_source, entry.name);

            // Get the path *relative* to the root, which is what 'ignore' needs
            // e.g., 'src/components/button.js'
            const relative_path = path.relative(root_source, source_path);

            // Add a trailing slash for directories to match .gitignore behavior
            // e.g., 'node_modules/'
            const check_path = entry.isDirectory() ? `${relative_path}/` : relative_path;

            // Check if the 'ignore' instance filters this path
            if (ig.ignores(check_path)) {
                console.log(`- Ignoring: ${check_path}`);
                continue; // Skip this file or directory
            }

            // If not ignored, determine its destination path
            const destination_path = path.join(root_destination, relative_path);

            if (entry.isDirectory()) {
                // If it's a directory, create it in the destination
                await fs.mkdir(destination_path, { recursive: true });
                // Recurse into this directory
                await walk(source_path);
            } else {
                // If it's a file, ensure its parent directory exists
                await fs.mkdir(path.dirname(destination_path), { recursive: true });
                // Copy the file
                await fs.copyFile(source_path, destination_path);
            }
        }
    }

    // Start the recursive walk from the root source directory
    await walk(root_source);
    console.log(`✅ Successfully copied files (with ignores) to: ${root_destination}`);
}
// --- END NEW FUNCTION ---

/**
 * Main orchestration function to run the script.
 * (This function is MODIFIED)
 */
async function main() {
    // --- Guard Clauses (Input Validation) ---
    const source_file_arg = process.argv[2];
    const final_destination_arg = './' // process.argv[3]; // You had this hardcoded, I left it but you might want process.argv[3]

    if (!source_file_arg || !final_destination_arg) {
        console.error('Error: Missing required arguments.');
        console.log('Usage: node index.js <path_to_zip_file> <final_destination_folder>');
        process.exit(1);
    }

    // --- Path Resolution ---
    const absolute_source = path.resolve(source_file_arg);
    const absolute_intermediate = INTERMEDIATE_FOLDER;
    const absolute_destination = path.resolve(final_destination_arg);

    // --- Main Execution ---
    try {
        // Step 1: Extract the zip file to the intermediate folder
        await extract_zip_archive(absolute_source, absolute_intermediate);

        // --- MODIFIED SECTION ---
        // Step 2: Check for .figmaignore and decide which copy function to use
        const figma_ignore_path = path.join(__dirname, '.figmaignore');
        let ignore_content = null;

        try {
            // Try to read the .figmaignore file
            ignore_content = await fs.readFile(figma_ignore_path, 'utf8');
        } catch (error) {
            // If the error is *not* "file not found", re-throw it.
            if (error.code !== 'ENOENT') {
                console.error('Error reading .figmaignore file:', error);
                throw error; // Propagate error to the main catch block
            }
            // If file is not found (ENOENT), ignore_content remains null. This is fine.
        }

        if (ignore_content) {
            // --- Path A: .figmaignore EXISTS ---
            console.log('Found .figmaignore. Applying ignore rules...');
            // Create an 'ignore' instance and add the file content
            const ig = new Ignore().add(ignore_content);

            // Use our new copy function that respects these rules
            await copy_with_ignore(absolute_intermediate, absolute_destination, ig);
        } else {
            // --- Path B: .figmaignore does NOT exist ---
            console.log('No .figmaignore file found. Copying all files...');

            // Use the original fast-path copy function
            await copy_files_recursively(absolute_intermediate, absolute_destination);
        }
        // --- END MODIFIED SECTION ---

        console.log('✨ All operations completed successfully.');

    } catch (error) {
        // This catch block handles errors from extraction, file I/O, or copying
        console.error('An error occurred during the process:', error);
        process.exit(1); // Exit with a failure code
    }

    // Step 3: Clean up the intermediate folder (this is unchanged)
    // We do this outside the try/catch, or in a 'finally' block,
    // but here is fine so it only runs on success.
    // Let's move it to *after* the catch block to *always* run.
    // --- Correction: Your original code had this *after* the catch,
    // which is good, but it should be inside the main() function scope.
    // I'm moving it to be *just before* the end of the main() function.

    try {
        await fs.rm(INTERMEDIATE_FOLDER, { recursive: true, force: true });
        console.log('🧹 Cleaned up intermediate folder.');
    } catch (rm_error) {
        // Don't fail the whole script if cleanup fails, just log it.
        console.warn(`Warning: Failed to clean up intermediate folder: ${rm_error.message}`);
    }
}

// Run the main function
main();
