import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaFileDownload } from 'react-icons/fa';



function InvoiceModal(props) {
    const { closeModal, info } = props;

    const closeAndDownloadInvoice = () => {
        closeModal();

        // Perform the PDF generation logic
        const contentHeight = document.getElementById('invoiceCapture').offsetHeight;
        html2canvas(document.querySelector('#invoiceCapture'), /* { scale: 2 } */).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [612, contentHeight + 10],
            });
            pdf.internal.scaleFactor = 1;
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('react-invoice.pdf');
        });
    };

    return (
        <div>
            <div className={`custom-modal show`}>
                <div id="invoiceCapture" className="invoice-modal-container">
                    <div className="dflex justify-between invoice-modal-header">
                        <div className='dflex flex-row'>
                            <h4 className="fw-bold">{info.billFrom || 'John Uberbacher'}</h4>
                            <h4 className='fw-bold'> Invoice   <span className='fw-bold text-grey'>#{info.invoiceNumber || ''}</span></h4>
                        </div>
                        <div className='dflex flex-row'>
                            <h4 className="fw-bold text-secondary">
                                Amout Due <span className='fw-bold text-grey'>{info.total || ''}</span>
                            </h4>
                            <h4 className="fw-bold text-secondary">
                                Issued On <span className='fw-bold text-grey'>{info.dateOfIssue || ''}</span>
                            </h4>
                        </div>
                    </div>
                    <div className='dflex w-100'>
                        <div className='w-50'>
                            <span className='fw-bold'>Bill To</span>
                            <div className='dflex flex-row gap-1 m-1'>
                                <span className='input-box' >{info.billTo}</span>
                                <span className='input-box' >{info.billToEmail}</span>
                                <span className='input-box' >{info.billToAddress}</span>
                            </div>
                        </div>
                        <div className='w-50'>
                            <span className='fw-bold'>Bill From</span>
                            <div className='dflex flex-row gap-1 m-1'>
                                <span className='input-box' >{info.billFrom}</span>
                                <span className='input-box' >{info.billFromEmail}</span>
                                <span className='input-box' >{info.billFromAddress}</span>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-item mt-1">
                        <table >
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {info.items.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.quantity}</td>
                                        <td>{info.currency} {item.price}</td>
                                        <td>{info.currency} {item.price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='invoice-modal-total-box'>
                        <div className='dflex flex-row'>
                            <span className='fw-bold'>Sub Total</span>
                            <span>{info.currency}&nbsp;{info.subTotal}</span>
                        </div>
                        <div className='dflex flex-row'>
                            <span className='fw-bold'>Discount</span>
                            <span>{info.currency}&nbsp;{info.discountAmount}</span>
                        </div>
                        <div className='dflex flex-row'>
                            <span className='fw-bold'>Tax</span>
                            <span>{info.currency}&nbsp;{info.taxAmount}</span>
                        </div>
                        <div className='dflex flex-row'>
                            <span className='fw-bold'>Total</span>
                            <span>{info.currency}&nbsp;{info.total}</span>
                        </div>
                    </div>
                    {info.notes && (
                        <div className="mt-1">
                            <p>{info.notes}</p>
                        </div>
                    )}
                </div>
                <div className='dflex gap-1 m-20'>
                    <button
                        className="invoice-sec-btn dflex align-center gap-1"
                        onClick={closeModal}
                    >
                        <span>X</span>
                        Close
                    </button>
                    <button
                        className="invoice-primary-btn dflex align-center gap-1"
                        onClick={closeAndDownloadInvoice}
                    >
                        <FaFileDownload />
                        Download Copy
                    </button>
                </div>

            </div>
            <hr className="mt-4 mb-3" />
        </div>
    );
}

export default InvoiceModal;
