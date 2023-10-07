import React from 'react';
import EditableField from './EditableField';
import {RiDeleteBin2Line} from "react-icons/ri"

function InvoiceItem(props) {
  const { items, currency, onRowDel, onRowAdd, onItemizedItemEdit } = props;

  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      currency={currency}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
    />
  ));

  return (
    <div className="invoice-item">
      <table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {itemTable}
        </tbody>
      </table>
      <button className="invoice-primary-btn" onClick={onRowAdd}>Add Item</button>
    </div>
  );
}

function ItemRow(props) {
  const { item, currency, onDelEvent, onItemizedItemEdit } = props;

  const handleDelEvent = () => {
    onDelEvent(item);
  };

  return (
    <tr>
      <td style={{ width: '100%' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
          }}
        />
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id
          }}
        />
      </td>
      <td style={{ minWidth: '70px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: '130px' }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: '50px' }}>
        <button
          onClick={handleDelEvent}
          className="del-btn"
        ><RiDeleteBin2Line size={18}/></button>
      </td>
    </tr>
  );
}

export default InvoiceItem;
