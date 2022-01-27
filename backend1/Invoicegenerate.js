const fs = require('fs');
const PDFDocument=require('pdfkit')
module.exports=function createInvoice(invoice, path) {
	let doc = new PDFDocument({ margin: 50 });

	generateHeader(doc,invoice);
	generateHeader1(doc,invoice);
	generateCustomerInformation(doc, invoice);
	generateInvoiceTable(doc, invoice);
	generateFooter(doc,invoice);
    //console.log(doc)
    console.log(path)
	doc.end();
	doc.pipe(fs.createWriteStream(path));
}
var data1=0
function generateHeader(doc,invoice) {
	const shipping = invoice.shipping;
	doc.image('logo.png', 50, 45, { width: 100 })
		.fillColor('#444444')
		.fontSize(25)
		.text('Invoice', 480, 45)
		.fontSize(16)
		.text('No', 500, 80)
		.fontSize(12)
		.text(invoice.invoiceno, 495, 100)
		.moveDown();
}

function generateHeader1(doc,invoice) {
	doc.fontSize(16)
		.text('From', 60, 140)
		.fontSize(12)
		.text("ak@gamil",60,165)
		.text("ak@gamil.com",60,180)
		.text("888888888",60,195)
		.fontSize(16)
		.text('Bill to', 60, 230)
		.fontSize(12)
		.text("ak",60,250)
		.text(invoice.receivername,60,265)
		.text(invoice.address,60,280)
		.text("9999999999",60,295)
		.fontSize(16)
		.text('status',450,140)
		.fontSize(16)
		.fillColor("red")
		.text(invoice.Status,450,160)
		.fillColor("black")
		.fontSize(16)
		.fillColor("grey")
		.text('Valuepay', 450, 180)
		.fontSize(12)
		.fillColor("black")
		.text(`${invoice.valuepay}`,450,200)
		.fillColor("black")
		.fontSize(16)
		.fillColor("grey")
		.text('Date', 450, 220)
		.fontSize(12)
		.fillColor("black")
		.text(`${invoice.cdate}`,450,240)
		.fontSize(12)
		.fillColor("grey")
		.text('Due Date', 450, 261)
		.fontSize(12)
		.fillColor("black")
		.text(`${invoice.ddate}`,450,280)
		.fontSize(16)
		.fillColor("grey")
		.text('Amount', 450, 300)
		.fontSize(20)
		.fillColor("red")
		.text(`${invoice.total}$`,450,320)
		.fillColor("black")
}

function generateCustomerInformation(doc, invoice) {
	const shipping = invoice.shipping;

	
}
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
	data1=y
	doc.fontSize(10)
		.text(c1, 50, y)
		.text(c2, 150, y)
		.text(c3, 280, y, { width: 90, align: 'right' })
		.text(c4, 370, y, { width: 90, align: 'right' })
		.text(c5, 0, y, { align: 'right' });
}
function generateInvoiceTable(doc, invoice) {
	let i,
		invoiceTableTop = 350;
        generateTableRow(
			doc,
			invoiceTableTop,
			"Item",
			"Price",
			"Quantity",
			"Disc(%)",
			"Amount"
		);
	for (i = 0; i < invoice.data.length; i++) {
		const item = invoice.data[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.item,
			item.price,
			item.quantity,
			item.discount,
			item.total
		);
	}
}
function generateFooter(doc,invoice) {
	
	doc
	.fontSize(16)
		.fillColor("grey")
		.text('Balance', 450, data1+30)
		.fontSize(20)
		.fillColor("red")
		.text(`${invoice.balance}$`,450,data1+50)
		.fillColor("black")
	.fontSize(
		10,
	).text(
		`Payment is due within ${invoice.duedate} days. Thank you for your business.`,
		50,
		data1+80,
		{ align: 'center', width: 450 },
	);
}