const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const generateReceipt = async (orderSummary) => {
    return new Promise((resolve, reject) => {
        const tempFolder = path.join(__dirname, '../temp'); // Adjust the path as needed

        if (!fs.existsSync(tempFolder)) {
            fs.mkdirSync(tempFolder);
        }

        const fileName = path.join(tempFolder, `receipt.pdf`);

        const doc = new PDFDocument();

        // Pipe the PDF content to a writable stream (in this case, a file)
        const stream = fs.createWriteStream(fileName);
        doc.pipe(stream);

        // Add content to the PDF document
        doc.fontSize(16).text('Order Receipt', { align: 'center' }).moveDown();
        doc.fontSize(14).text(`Order ID: ${orderSummary.orderId}`);
        doc.text(`Payment Method: ${orderSummary.paymentMethod}`);
        doc.text(`Customer: ${orderSummary.customer.name} (${orderSummary.customer.email})`).moveDown();

        // Display each item in the cart
        orderSummary.cartItems.forEach((item) => {
            doc.text(`Item: ${item.name}`).font('Helvetica-Bold').text(`Price: $${item.price.toFixed(2)}`).font('Helvetica').text(`Quantity: ${item.quantity}`).text(`Total: $${item.total.toFixed(2)}`).moveDown();
        });

        doc.text(`Total Amount: $${orderSummary.totalAmount.toFixed(2)}`);
        doc.text(`Payment Date: ${orderSummary.paymentDate}`).moveDown();

        doc.fontSize(12).text('Thank you for shopping with us!', { align: 'center' }).moveDown();

        // Add some decorative elements for a better look
        doc.rect(50, 780, 500, 1).fill('#000'); // Horizontal line
        doc.rect(50, 780, 1, 60).fill('#000'); // Vertical line
        doc.rect(550, 780, 1, 60).fill('#000'); // Vertical line

        // Finalize the PDF
        doc.end();

        stream.on('finish', () => {
            resolve(fileName);
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
};

module.exports = generateReceipt;
