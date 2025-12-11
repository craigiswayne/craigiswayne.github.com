import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Creates a PDF file from a local HTML file using Puppeteer.
 *
 * @param {string} html_file_path - The absolute path to the input HTML file.
 * @param {string} output_pdf_path - The absolute path where the PDF will be saved.
 * @returns {Promise<void>}
 */
const create_pdf_from_html = async (html_file_path, output_pdf_path) => {
	if (!fs.existsSync(html_file_path)) {
		console.error(`Error: Input HTML file not found at: ${html_file_path}`);
		process.exit(1);
	}

	/** @type {string} */
	const output_dir = path.dirname(output_pdf_path);
	if (!fs.existsSync(output_dir)) {
		console.log(`Output directory does not exist, creating it: ${output_dir}`);
		fs.mkdirSync(output_dir, { recursive: true });
	}

	/** @type {import('puppeteer').Browser | null} */
	let browser = null;
	try {
		console.log('Launching headless browser...');
		browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		const page = await browser.newPage();

		const file_url = `file://${html_file_path}`;
		console.log(`Navigating to ${file_url}`);

		await page.goto(file_url, { waitUntil: 'networkidle0' });

		console.log(`Generating PDF at ${output_pdf_path}...`);
		await page.pdf({
			path: output_pdf_path,
			format: 'A4',
			printBackground: true,
			margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
		});

		console.log('PDF generated successfully!');
	} catch (error) {
		console.error('An error occurred during PDF generation:', error);
		process.exit(1);
	} finally {
		await browser?.close();
		console.log('Browser closed.');
	}
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input_html_file = path.resolve(__dirname, '..', 'build/resume', 'index.html');
const output_pdf_file = path.resolve(__dirname, '..', 'build', 'resume.pdf');

create_pdf_from_html(input_html_file, output_pdf_file);
