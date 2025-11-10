// Import the 'extract-zip' library
const extract = require('extract-zip');

// Import 'path' for resolving paths
const path = require('path');

// Import 'fs/promises' for asynchronous file system operations (like copying)
// We add 'node:' prefix as is standard practice for built-in modules.
const fs = require('node:fs/promises');

// --- Configuration ---
// This folder is used as a temporary staging area for extracted files
const INTERMEDIATE_FOLDER = path.resolve(__dirname, 'figma_extracted_files');
// --- End of Configuration ---

/**
 * Extracts a zip file.
 * This function is designed to be called by another 'async' function.
 * If 'extract' fails, it will throw an error (reject the promise),
 * which will be caught by the 'catch' block in our 'main' function.
 *
 * @param {string} source_file - The absolute path to the zip file.
 * @param {string} target_dir - The absolute path to the extraction folder.
 * @returns {Promise<void>} A promise that resolves when extraction is complete.
 */
async function extract_zip_archive(source_file, target_dir) {
    console.log(`Starting extraction of: ${source_file}`);
    await extract(source_file, { dir: target_dir });
    console.log(`✅ Extraction complete. Files are in: ${target_dir}`);
}

/**
 * Recursively copies files from a source directory to a destination.
 *
 * @param {string} source_dir - The absolute path to the source folder.
 * @param {string} destination_dir - The absolute path to the destination folder.
 * @returns {Promise<void>} A promise that resolves when copying is complete.
 */
async function copy_files_recursively(source_dir, destination_dir) {
    console.log(`Starting recursive copy from: ${source_dir}`);
    // fs.cp handles creating the destination directory if it doesn't exist
    // and recursively copies all contents.
    await fs.cp(source_dir, destination_dir, { recursive: true });
    console.log(`✅ Successfully copied files to: ${destination_dir}`);
}

/**
 * Main orchestration function to run the script.
 */
async function main() {
    // --- Guard Clauses (Input Validation) ---
    const source_file_arg = process.argv[2];
    const final_destination_arg = './'

    // Check if both arguments are provided
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

        // Step 2: Copy files from the intermediate to the final folder
        await copy_files_recursively(absolute_intermediate, absolute_destination);

        console.log('✨ All operations completed successfully.');

    } catch (error) {
        // If either 'extract_zip_archive' or 'copy_files_recursively' fails
        // (rejects its promise), this 'catch' block will run.
        console.error('An error occurred during the process:', error);
        process.exit(1); // Exit with a failure code
    }

    await fs.rm(INTERMEDIATE_FOLDER, { recursive: true });
}

// Run the main function
main();