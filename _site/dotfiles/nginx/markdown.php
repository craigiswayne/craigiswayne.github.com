<?php
// CREDIT TO: https://github.com/magnetikonline/ghmarkdownrender
class GitHubMarkdownRender {

	const API_URL = 'https://api.github.com/markdown/raw';
	const CONTENT_TYPE = 'text/x-markdown';
	const USER_AGENT = 'magnetikonline/ghmarkdownrender 1.0';
	const MARKDOWN_EXT = '.md';
	const CACHE_SESSION_KEY = 'ghmarkdownrender';

	const GITHUB_PERSONAL_ACCESS_TOKEN = '2397a5eee90416eaf7a556b70a74cea3e072d7fd';
	const DOCUMENT_ROOT = '/usr/local/var/www';


	public function execute() {

		// validate DOCUMENT_ROOT exists
		if (!is_dir(self::DOCUMENT_ROOT)) {
			$this->renderErrorMessage(
				'<p>Given <strong>DOCUMENT_ROOT</strong> of <strong>' . htmlspecialchars(self::DOCUMENT_ROOT) . '</strong> ' .
				'is not a valid directory, ensure it matches that of your local web server document root.</p>'
			);

			return;
		}

		// get requested local markdown page and check file exists
		if (($markdownFilePath = $this->getRequestedPageFilePath()) === false) {
			$this->renderErrorMessage(
				'<p>Unable to determine requested Markdown page.</p>' .
				'<p>URI must end with an <strong>' . self::MARKDOWN_EXT . '</strong> file extension.</p>'
			);

			return;
		}

		if (!is_file($markdownFilePath)) {
			// can't find markdown file on disk
			$this->renderErrorMessage(
				'<p>Unable to open <strong>' . htmlspecialchars($markdownFilePath) . '</strong></p>' .
				'<p>Ensure <strong>DOCUMENT_ROOT</strong> matches that of your local web server.</p>'
			);

			return;
		}

		// check PHP session for cached markdown response
		$html = $this->getMarkdownHtmlFromCache($markdownFilePath);
		if ($html !== false) {
			// render markdown HTML from cache
			echo(
				$this->getHtmlPageHeader() .
				$html .
				$this->getHtmlPageFooter('Rendered from cache')
			);

			return;
		}

		// make request to GitHub API passing markdown file source
		$response = $this->parseGitHubMarkdownResponse(
			$this->doGitHubMarkdownRequest(file_get_contents($markdownFilePath))
		);

		if (!$response['ok']) {
			// error calling API
			$this->renderErrorMessage(
				'<p>Unable to access GitHub API</p>' .
				'<ul>' .
					'<li>Check your <strong>GITHUB_PERSONAL_ACCESS_TOKEN</strong> is correct (maybe revoked?)</li>' .
					'<li>Is GitHub/GitHub API endpoint <strong>' . htmlspecialchars(self::API_URL) . '</strong> accessable?</li>' .
					'<li>Has rate limit been exceeded? If so, wait until next hour</li>' .
          '<li>OR: Go to <a href="https://github.com/settings/tokens">GitHub Personal Access tokens</a></li>'.
				'</ul>'
			);

			return;
		}

		// save markdown HTML back to cache
		$this->setMarkdownHtmlToCache($markdownFilePath,$response['html']);

		// render markdown HTML from API response
		echo(
			$this->getHtmlPageHeader() .
			$response['html'] .
			$this->getHtmlPageFooter(
				'Rendered from GitHub Markdown API. ' .
				'<strong>Rate limit:</strong> ' . $response['rateLimit'] . ' // ' .
				'<strong>Rate remain:</strong> ' . $response['rateRemain']
			)
		);
	}

	private function getRequestedPageFilePath() {

		// get request URI, strip any querystring from end (used to trigger Markdown rendering from web server rewrite rule)
		$requestURI = trim($_SERVER['REQUEST_URI']);
		$requestURI = preg_replace('/\?.+$/','',$requestURI);

//		print_r($_SERVER['REQUEST_URI']);
//		echo '<br/>';
//		var_dump($_SERVER);
//		print_r(self::DOCUMENT_ROOT);

		// request URI must end with self::MARKDOWN_EXT

		return $_SERVER['QUERY_STRING'];

		//original code below
//		return (preg_match('/\\' . self::MARKDOWN_EXT . '$/',$requestURI)) ? self::DOCUMENT_ROOT . $requestURI : false;
	}

	private function renderErrorMessage($errorHtml) {

		echo(
			$this->getHtmlPageHeader() .
			'<h1>Error</h1>' .
			$errorHtml .
			$this->getHtmlPageFooter()
		);
	}

	private function getHtmlPageHeader() {

		return <<<EOT
<!DOCTYPE html>

<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta name="viewport" content="width=device-width,initial-scale=1" />

	<title>GitHub Markdown render</title>
	<style>
		body {
			background: #fff;
			color: #333;
			font: 16px/1.6 'Helvetica Neue',Helvetica,'Segoe UI',Arial,freesans,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
			margin: 20px;
			padding: 0;
		}

		#frame {
			border: 1px solid #ddd;
			border-radius: 3px;
			margin: 0 auto;
			width: 978px;
		}

		#markdown {
			padding: 45px;
		}

		#markdown > *:first-child {
			margin-top: 0;
		}

		#markdown > *:last-child {
			margin-bottom: 0;
		}

		h1,h2,h3,h4,h5,h6 {
			font-weight: bold;
			line-height: 1.4;
			margin: 1em 0 16px;
			padding: 0;
		}

		h1,h2 {
			padding-bottom: 0.3em;
		}

		h1 {
			border-bottom: 1px solid #eee;
			font-size: 2.25em;
			line-height: 1.2;
		}

		h2 {
			border-bottom: 1px solid #eee;
			font-size: 1.75em;
			line-height: 1.225;
		}

		h3 {
			font-size: 1.5em;
			line-height: 1.43;
		}

		h4 {
			font-size: 1.25em;
		}

		h5,h6 {
			font-size: 1em;
		}

		h6 {
			color: #777;
		}

		a {
			color: #4183c4;
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		blockquote,dl,ol,p,pre,table,ul {
			margin: 0 0 16px;
			padding: 0;
		}

		blockquote {
			border-left: 4px solid #ddd;
			color: #777;
			padding: 0 15px;
		}

		blockquote > *:first-child {
			margin-top: 0;
		}

		blockquote > *:last-child {
			margin-bottom: 0
		}

		hr {
			background: #e7e7e7;
			border: none;
			height: 4px;
			margin: 16px 0;
			overflow: hidden;
			padding: 0;
		}

		hr:before,
		hr:after {
			content: '';
			display: table;
		}

		hr:after {
			clear: both;
		}

		img {
			background: #fff;
			border: 0;
			box-sizing: content-box;
			max-width: 100%;
		}

		kbd {
			background: #fcfcfc;
			border-bottom-color: #bbb;
			border-radius: 3px;
			border: 1px solid #ccc;
			box-shadow: inset 0 -1px 0 #bbb;
			color: #555;
			display: inline-block;
			font: 11px/10px Consolas,'Liberation Mono',Menlo,Courier,monospace;
			padding: 3px 5px;
			vertical-align: middle;
		}

		ol,ul {
			padding-left: 2em;
		}

		ol ol,
		ol ul,
		ul ol,
		ul ul {
			margin-bottom: 0;
			margin-top: 0;
		}

		ol ol,
		ul ol {
			list-style-type: lower-roman;
		}

		li > p {
			margin-top: 16px;
		}

		table {
			border-collapse: collapse;
			border-spacing: 0;
		}

		table tr {
			background: #fff;
			border-top: 1px solid #ccc;
		}

		table tr:nth-child(2n) {
			background: #f8f8f8;
		}

		table th,
		table td {
			border: 1px solid #ddd;
			padding: 6px 13px;
		}

		table th {
			font-weight: bold;
		}

		code,pre,tt {
			font-family: Consolas,'Liberation Mono',Menlo,Courier,monospace;
			font-size: 12px;
		}

		code,tt {
			background: rgba(0,0,0,0.04);
			border-radius: 3px;
			font-size: 85%;
			margin: 0;
			padding: 0.2em 0;
		}

		code {
			white-space: nowrap;
		}

		code:before,
		code:after,
		tt:before,
		tt:after {
			content: '\\00a0';
			letter-spacing: -0.2em;
		}

		pre {
			background: #f7f7f7;
			border-radius: 3px;
			font-size: 85%;
			line-height: 1.45;
			overflow: auto;
			padding: 16px;
		}

		pre code,
		pre tt {
			background: transparent;
			border: 0;
			margin: 0;
			padding: 0;
		}

		pre > code {
			background: transparent;
			font-size: 100%;
			white-space: pre;
		}

		pre > code:before,
		pre > code:after {
			content: normal;
		}

		h1 code,h1 tt,
		h2 code,h2 tt,
		h3 code,h3 tt,
		h4 code,h4 tt,
		h5 code,h5 tt,
		h6 code,h6 tt {
			font-size: inherit;
		}

		.highlight { margin-bottom: 16px; }

		.pl-c { color: #969896; }
		.pl-c1,.pl-s .pl-v { color: #0086b3; }
		.pl-e,.pl-en { color: #795da3; }
		.pl-ent { color: #63a35c; }
		.pl-id { color: #b52a1d; }
		.pl-ii { background-color: #b52a1d;color: #f8f8f8; }
		.pl-k { color: #a71d5d; }
		.pl-mb { color: #333;font-weight: bold; }
		.pl-md { background-color: #ffecec;color: #bd2c00; }
		.pl-mdr { color: #795da3;font-weight: bold; }
		.pl-mh,.pl-mh .pl-en,.pl-ms { color: #1d3e81;font-weight: bold; }
		.pl-mi { color: #333;font-style: italic; }
		.pl-mi1 { background-color: #eaffea;color: #55a532; }
		.pl-ml { color: #693a17; }
		.pl-mo { color: #1d3e81; }
		.pl-mq { color: #008080; }
		.pl-pds,.pl-s,
		.pl-s .pl-pse .pl-s1,
		.pl-s .pl-s1,.pl-smi { color: #333; }
		.pl-sr .pl-cce { color: #63a35c;font-weight: bold; }
		.pl-sr .pl-sra,
		.pl-sr .pl-sre { color: #183691; }
		.pl-sr,.pl-sr .pl-cce,
		.pl-v { color: #ed6a43; }

		#footer {
			color: #777;
			font-size: 11px;
			margin: 10px auto;
			text-align: right;
			white-space: nowrap;
			width: 978px;
		}
	</style>
</head>

<body>

<div id="frame"><div id="markdown">
EOT;
	}

	private function getHtmlPageFooter($footerMessageHtml = false) {

		return
			'</div></div>' .
			(($footerMessageHtml !== false)
				? '<p id="footer">' . $footerMessageHtml . '</p>'
				: ''
			) .
			'</body></html>';
	}

	private function getMarkdownHtmlFromCache($markdownFilePath) {

		// start session, look for file path in session space
		session_start();

		if (!isset($_SESSION[self::CACHE_SESSION_KEY][$markdownFilePath])) {
			// file path not found in cache
			return false;
		}

		// file path exists - compare file modification time to that in cache
		$cacheData = $_SESSION[self::CACHE_SESSION_KEY][$markdownFilePath];
		return ($cacheData['timestamp'] == filemtime($markdownFilePath))
			? $cacheData['html']
			: false;
	}

	private function setMarkdownHtmlToCache($markdownFilePath,$html) {

		if (!isset($_SESSION[self::CACHE_SESSION_KEY])) {
			// create new session cache structure
			$_SESSION[self::CACHE_SESSION_KEY] = [];
		}

		$_SESSION[self::CACHE_SESSION_KEY][$markdownFilePath] = [
			'timestamp' => filemtime($markdownFilePath),
			'html' => $html
		];
	}

	private function doGitHubMarkdownRequest($markdownSource) {

		$curl = curl_init();
		curl_setopt_array(
			$curl,
			[
				CURLOPT_HEADER => true,
				CURLOPT_HTTPHEADER => [
					'Authorization: token ' . self::GITHUB_PERSONAL_ACCESS_TOKEN,
					'Content-Type: ' . self::CONTENT_TYPE,
					'User-Agent: ' . self::USER_AGENT
				],
				CURLOPT_POST => true,
				CURLOPT_POSTFIELDS => $markdownSource,
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_URL => self::API_URL
			]
		);

		$response = curl_exec($curl);
		curl_close($curl);

		return $response;
	}

	private function parseGitHubMarkdownResponse($response) {

		$seenHeader = false;
		$httpStatusOk = false;
		$rateLimit = 0;
		$rateRemain = 0;

		while (true) {
			// seek next CRLF, if not found bail out
			$nextEOLpos = strpos($response,"\r\n");
			if ($nextEOLpos === false) {
				// end of response hit
				break;
			}

			// extract header line and pop off from $response
			$headerLine = substr($response,0,$nextEOLpos);
			$response = substr($response,$nextEOLpos + 2);

			if ($seenHeader && (trim($headerLine) == '')) {
				// end of HTTP headers, bail out
				break;
			}

			if (!$seenHeader && preg_match('/^[a-zA-Z-]+:/',$headerLine)) {
				// have seen a header item - able to bail out once next blank line detected
				$seenHeader = true;
			}

			if (preg_match('/^Status: (\d+)/',$headerLine,$match)) {
				// save HTTP response status, expecting 200 (OK)
				$httpStatusOk = (intval($match[1]) == 200);
			}

			if (preg_match('/^X-RateLimit-Limit: (\d+)$/',$headerLine,$match)) {
				// save total allowed request count
				$rateLimit = intval($match[1]);
			}

			if (preg_match('/^X-RateLimit-Remaining: (\d+)$/',$headerLine,$match)) {
				// save request count remaining
				$rateRemain = intval($match[1]);
			}
		}

		// update id="" values of heading anchor elements from generated Markdown -> HTML
		$response = preg_replace(
			'/<a id="user-content-([^"]+)" class="anchor" href="/',
			'<a id="$1" class="anchor" href="/',
			$response
		);

		return [
			'ok' => ($httpStatusOk && $rateLimit && $rateRemain),
			'rateLimit' => $rateLimit,
			'rateRemain' => $rateRemain,
			'html' => $response
		];
	}
}


(new GitHubMarkdownRender())->execute();
