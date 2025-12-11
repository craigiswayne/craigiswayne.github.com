import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Creates a PDF file from a local HTML file using Puppeteer.
 *
 * @param html_file_path {string} - The absolute path to the input HTML file.
 * @param output_pdf_path {string} - The absolute path where the PDF will be saved.
 * @return {Promise<void>}
 */
const create_pdf_from_html = async (html_file_path, output_pdf_path) => {
    if (!fs.existsSync(html_file_path)) {
        console.error(`Error: Input HTML file not found at: ${html_file_path}`);
        return;
    }

    /**
     * @type {string}
     */
    const output_dir = path.dirname(output_pdf_path);
    if (!fs.existsSync(output_dir)) {
        console.log(`Output directory does not exist, creating it: ${output_dir}`);
        fs.mkdirSync(output_dir, {recursive: true});
    }

    /**
     *
     * @type {Browser}
     */
    let browser = null;
    try {
        console.log('Launching headless browser...');
        browser = await puppeteer.launch({headless: 'new'});
        /**
         * @type {Page}
         */
        const page = await browser.newPage();

        const file_url = `file://${html_file_path}`;
        console.log(`Navigating to ${file_url}`);

        await page.goto(file_url, {waitUntil: 'networkidle0'});

        console.log(`Generating PDF at ${output_pdf_path}...`);
        await page.pdf({
            path: output_pdf_path,
            format: 'A4',
            printBackground: true,
            margin: {top: '20mm', right: '20mm', bottom: '20mm', left: '20mm'},
        });

        console.log('PDF generated successfully!');
    } catch (error) {
        console.error('An error occurred during PDF generation:', error);
    } finally {
        await browser?.close();
        console.log('Browser closed.');
    }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * @type {string}
 */
const input_html_file = path.resolve(__dirname, '..', 'build/resume', 'index.html');
/**
 * @type {string}
 */
const output_pdf_file = path.resolve(__dirname, '..', 'build/public', 'resume.pdf');
create_pdf_from_html(input_html_file, output_pdf_file);
