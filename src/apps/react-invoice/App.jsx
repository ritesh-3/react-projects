import React, { useEffect, useState } from 'react'
import "./App.css";
import InvoiceItem from './components/InvoiceItem';
import InvoiceModal from './components/InvoiceModal';

const initialState = {
    isOpen: false,
    currency: '₹',
    currentDate: '',
    invoiceNumber: 1001,
    dateOfIssue: '',
    billTo: '',
    billToEmail: '',
    billToAddress: '',
    billFrom: '',
    billFromEmail: '',
    billFromAddress: '',
    notes: '',
    total: '0.00',
    subTotal: '0.00',
    taxRate: '',
    taxAmount: '0.00',
    discountRate: '',
    discountAmount: '0.00',
    items: [
        {
            id: 0,
            name: '',
            description: '',
            price: '1.00',
            quantity: 1
        }
    ]
}

const stubObj = {
    "isOpen": false,
    "currency": "₹",
    "currentDate": "",
    "invoiceNumber": 1001,
    "dateOfIssue": "2023-10-28",
    "billTo": "Ritesh sharma",
    "billToEmail": "ritesh88944@gmail.com",
    "billToAddress": "Buttetmere estate summerhill shimla-5 (H.P.)",
    "billFrom": "Ritesh sharma",
    "billFromEmail": "ritesh88944@gmail.com",
    "billFromAddress": "Buttetmere estate summerhill shimla-5 (H.P.)",
    "notes": "Thanks",
    "total": "1.00",
    "subTotal": "1.00",
    "taxRate": "0",
    "taxAmount": "0.00",
    "discountRate": "0",
    "discountAmount": "0.00",
    "items": [
        {
            "id": 0,
            "name": "Ritesh sharma",
            "description": "jnjnbj",
            "price": "1.00",
            "quantity": 1
        },
        {
            "id": 0,
            "name": "Ritesh sharma",
            "description": "jnjnbj",
            "price": "1.00",
            "quantity": 1
        },
        {
            "id": 0,
            "name": "Ritesh sharma",
            "description": "jnjnbj",
            "price": "1.00",
            "quantity": 1
        },
    ]
}

const App = () => {

    const [invoiceDetails, setInvoiceDetails] = useState(initialState);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        handleCalculateTotal();
    }, [invoiceDetails.taxRate, invoiceDetails.discountRate]);

    const onItemizedItemEdit = (evt) => {
        let item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        let items = invoiceDetails.items.slice();
        let newItems = items.map(function (items) {
            for (let key in items) {
                if (key == item.name && items.id == item.id) {
                    items[key] = item.value;
                }
            }
            return items;
        });
        setInvoiceDetails({ ...invoiceDetails, items: newItems });
        handleCalculateTotal();
    };

    const handleRowDel = (item) => {
        const newItems = invoiceDetails.items.filter(elem => elem.id !== item.id);
        setInvoiceDetails({ items: newItems });
    };
    const handleAddEvent = (evt) => {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        let newItem = {
            id: id,
            name: '',
            price: '1.00',
            description: '',
            quantity: 1
        }

        setInvoiceDetails({ ...invoiceDetails, items: [...invoiceDetails.items, newItem] });
    }

    const handleCalculateTotal = () => {
        let items = invoiceDetails.items;
        let subTotal = 0;

        items.forEach((item) => {
            subTotal += parseFloat(item.price) * parseInt(item.quantity);
        });

        const calculatedTaxAmount = parseFloat((subTotal * invoiceDetails.taxRate) / 100).toFixed(2);
        const calculatedDiscountAmount = parseFloat((subTotal * invoiceDetails.discountRate) / 100).toFixed(2);
        const calculatedTotal = (subTotal - parseFloat(calculatedDiscountAmount) + parseFloat(calculatedTaxAmount)).toFixed(2);

        setInvoiceDetails({
            ...invoiceDetails,
            subTotal: parseFloat(subTotal).toFixed(2),
            taxAmount: calculatedTaxAmount,
            discountAmount: calculatedDiscountAmount,
            total: calculatedTotal,
        });
    };


    const updateInvoiceDetails = (event) => {
        setInvoiceDetails({ ...invoiceDetails, [event.target.name]: event.target.value })
    }

    const openModal = (event) => {
        event.preventDefault();
        setInvoiceDetails({ ...invoiceDetails, dateOfIssue: new Date().toLocaleDateString() })
        console.log(invoiceDetails)
        setShowModal(true);
    }

    const testModal = () => {
        setInvoiceDetails(stubObj)
        setShowModal(true);
    }

    return (
        <main id='invoice'>
            <form onSubmit={openModal} className='invoice-container'>
                <div className='section1'>
                    {/* Section 1 head */}
                    <div className='dflex w-100 justify-between'>
                        <div className='dflex flex-col gap-1'>
                            <div className='dflex align-center'>
                                <span className="fw-bold">Current&nbsp;Date&nbsp;</span>
                                <span className="ml-1">{new Date().toLocaleDateString()}</span>
                            </div>
                            {/* <div className='dflex align-center'>
                                <span className="fw-bold">Due&nbsp;Date&nbsp;</span>
                                <input required type="date" name='dateOfIssue' className='input-box ml-1' value={invoiceDetails.dateOfIssue} onChange={updateInvoiceDetails} />
                            </div> */}
                        </div>
                        <div className=''>
                            <div className='dflex align-center'>
                                <span className="fw-bold">Invoice Number</span>
                                <input required type="number" name='invoiceNumber' style={{ width: window.innerWidth < 800 ? "50px" : "" }} className='input-box ml-1' value={invoiceDetails.invoiceNumber} onChange={updateInvoiceDetails} />
                            </div>
                        </div>
                    </div>
                    {/* -- Section 1 head -- */}
                    <div className='line m-20'></div>
                    {/* Billing Section */}
                    <div className='dflex w-100'>
                        <div className='w-50'>
                            <span className='fw-bold'>Bill To</span>
                            <div className='dflex flex-row gap-1 m-1'>
                                <input required name='billTo' className='input-box' type="text" placeholder='Who is this invoice to ?' value={invoiceDetails.billTo} onChange={updateInvoiceDetails} />
                                <input required name='billToEmail' className='input-box' type="text" placeholder='Email Address' value={invoiceDetails.billToEmail} onChange={updateInvoiceDetails} />
                                <input required name='billToAddress' className='input-box' type="text" placeholder='Billing Address' value={invoiceDetails.billToAddress} onChange={updateInvoiceDetails} />
                            </div>
                        </div>
                        <div className='w-50'>
                            <span className='fw-bold'>Bill From</span>
                            <div className='dflex flex-row gap-1 m-1'>
                                <input required name='billFrom' className='input-box' type="text" placeholder='Who is this invoice from ?' value={invoiceDetails.billFrom} onChange={updateInvoiceDetails} />
                                <input required name='billFromEmail' className='input-box' type="text" placeholder='Email Address' value={invoiceDetails.billFromEmail} onChange={updateInvoiceDetails} />
                                <input required name='billFromAddress' className='input-box' type="text" placeholder='Billing Address' value={invoiceDetails.billFromAddress} onChange={updateInvoiceDetails} />
                            </div>
                        </div>
                    </div>
                    {/* --Billing Section -- */}
                    <div className='line m-2'></div>
                    <InvoiceItem items={invoiceDetails.items} currency={invoiceDetails.currency} onRowDel={handleRowDel} onRowAdd={handleAddEvent} onItemizedItemEdit={onItemizedItemEdit} />
                    <div className='line m-20'></div>
                    <div className='dflex flex-row w-100'>
                        <span className='fw-bold'>Note</span>
                        <input name='notes' type="text" placeholder='Thanks For Buisness 😊' className='input-box m-2' value={invoiceDetails.notes} onChange={updateInvoiceDetails} />
                    </div>
                </div>
                <div className='section2'>
                    <button type='submit' className='invoice-primary-btn w-100'>Review Invoice</button>
                    <div className='line m-20'></div>
                    <div className='w-100 dflex gap-1'>
                        <label className='fw-bold'>Currency</label>
                        <select name='currency' className='input-box2' onChange={(e) => setInvoiceDetails({ ...invoiceDetails, currency: e.target.value })}>
                            <option value="₹">INR (Indian Rupee)</option>
                            <option value="💲">USD (British Pound Sterling)</option>
                            <option value="¥">JPY (Japanese Yen)</option>
                            <option value="$">CAD (Canadian Dollar)</option>
                            <option value="$">AUD (Australian Dollar)</option>
                            <option value="$">SGD (Signapore Dollar)</option>
                            <option value="¥">CNY (Chinese Renminbi)</option>
                            <option value="₿">BTC (Bitcoin)</option>
                        </select>
                    </div>
                    <div className='w-100 dflex gap-1 mt-1 align-center'>
                        <label className='fw-bold'>Tax Rate</label>
                        <input required name='taxRate' type="number" className='input-box2 required-box2' placeholder="0.0" min="0.00" step="0.01" max="100.00" value={invoiceDetails.taxRate} onChange={updateInvoiceDetails} />
                        <span className='input-suffix'>%</span>
                    </div>
                    <div className='w-100 dflex gap-1 mt-1 align-center'>
                        <label className='fw-bold'>Discount</label>
                        <input required name='discountRate' type="number" className='input-box2' placeholder="0.0" min="0.00" step="0.01" max="100.00" value={invoiceDetails.discountRate} onChange={updateInvoiceDetails} />
                        <span className='input-suffix'>%</span>
                    </div>
                    <div className='line m-20'></div>
                    <div className='invoice-total-box'>
                        <div className='dflex w-100 justify-between'>
                            <span className='fw-bold'>Sub Total</span>
                            <span>{invoiceDetails.currency}{invoiceDetails.subTotal}</span>
                        </div>
                        <div className='dflex w-100 justify-between'>
                            <span className='fw-bold'>Discount</span>
                            <span>{invoiceDetails.currency}{invoiceDetails.discountAmount}</span>
                        </div>
                        <div className='dflex w-100 justify-between'>
                            <span className='fw-bold'>Tax</span>
                            <span>{invoiceDetails.currency}{invoiceDetails.taxAmount}</span>
                        </div>
                    </div>
                    <div className='invoice-grand-total'>
                        <span className='fw-bold'>Total</span>
                        <span>{invoiceDetails.currency}{invoiceDetails.total}</span>
                    </div>
                </div>
                {showModal &&
                    <InvoiceModal closeModal={() => { setShowModal(false) }} info={invoiceDetails} />
                }
            </form>
        </main>
    )
}

export default App
