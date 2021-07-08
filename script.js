const renderRow = (data) => {
  return `<tr>
            <td>${data.item}</td>
            <td>$${data.amount}</td>
          </tr>`
};

const renderRows = (data) => {
  const html = [];
  for (let i=0; i<data.length; i++) {
    html.push(renderRow(data[i]));
  }
  return html.join('');
}

const budgetItems = [{
  item: 'Car',
  amount: 1.00
}]

const calculateTotals = () => {
  let total = 0.00;
  for (let i=0; i<budgetItems.length; i++) {
    total+=parseFloat(budgetItems[i].amount);
  }
  return { item: 'Total', amount: total }
}

const addBudgetItem = () => {
  const budgetItem = {
    item: document.getElementById('newItem').value,
    amount: document.getElementById('newAmount').value
  }
  budgetItems.push(budgetItem);
}


const renderPage = (id) => {
  document.getElementById(id).tBodies[0].innerHTML = renderRows(budgetItems);
  document.getElementById(id).tFoot.innerHTML = renderRow(calculateTotals());
}

document.addEventListener('DOMContentLoaded', function($ev) {
  renderPage('budgetTable');
});

document.getElementById('addButton').addEventListener('click', function($ev) {
  addBudgetItem();
  renderPage('budgetTable');
});