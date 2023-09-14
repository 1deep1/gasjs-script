const fs = require('fs');
const { JSDOM } = require('jsdom');

// Path to the "form.html" file and "form_out.txt" file
const formHtmlPath = 'form.html';
const formOutFilePath = 'form_out.txt';

// Read the content of the HTML file
const htmlContent = fs.readFileSync(formHtmlPath, 'utf-8');

// Create a DOM document from the HTML content
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// Read the IDs from "form_out.txt"
const formOutIds = fs.readFileSync(formOutFilePath, 'utf-8').split('\n').map(id => id.trim());

// Clone the document for manipulation
const clonedDocument = document.cloneNode(true);

// Find items with class ".dogovor_list_item.row" that don't have a matching ID
const dogovorItems = clonedDocument.querySelectorAll('.dogovor_list_item.row');
dogovorItems.forEach(item => {
    const button = item.querySelector('.colmn_button.col-1');
    if (!button || !formOutIds.includes(button.id)) {
        item.remove();
    }
});

// Serialize the modified document to HTML
const resultHtml = clonedDocument.documentElement.outerHTML;

// Write the modified HTML to "result.html"
fs.writeFileSync('result.html', resultHtml);

console.log(`Modified HTML saved as result.html`);
