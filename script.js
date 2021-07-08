const renderActions = (idx) => {
  return `
  <button type="button" class="edit-button" data-idx="${idx}">Edit</button>
  <button type="button" class="delete-button" data-idx="${idx}">Delete</button>`
}


const renderEditRow = (data, idx) => {

  return `<tr>
            <td><input type="text" id="editItem" value="${data.item}"></td>
            <td><input type="number" id="editAmount" value="${parseFloat(data.amount)}"></td>
            <td>
              <button type="button" class="save-button" data-idx="${idx}">Save</button>
              <button type="button" class="cancel-button" data-idx="${idx}">Cancel</button>
            </td>
          </tr>`
}

const renderRow = (data, idx) => {
  return `<tr>
            <td>${data.item}</td>
            <td>$${data.amount}</td>
            <td>${idx != null ? renderActions(idx) : '' }</td>
          </tr>`
};

const renderRows = (data, idx) => {
  const html = [];
  for (let i=0; i<data.length; i++) {
    if (idx != null && idx == i) {
      html.push(renderEditRow(data[i], i));
    } else if (idx != null && idx != i) {
      html.push(renderRow(data[i]));
    } else {
      html.push(renderRow(data[i], i));
    }
  }
  return html.join('');
}

let budgetItems = [{
  item: 'Car',
  amount: 1.00
}]

const loadBudget = (storageKey) => {
  const budget = window.localStorage.getItem(storageKey);
  if (budget) {
    budgetItems = JSON.parse(budget);  
  }
}

const saveBudget = (storageKey) => {
  const budget = JSON.stringify(budgetItems);
  window.localStorage.setItem(storageKey, budget);
}

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
  document.getElementById('newItem').value = null;
  document.getElementById('newAmount').value = null;
}

const editBudgetItem = (idx) => {
  id = 'budgetTable';
  
  document.getElementById('newItem').setAttribute('disabled', true);
  document.getElementById('newAmount').setAttribute('disabled', true);
  document.getElementById('addButton').setAttribute('disabled', true);

  document.getElementById(id).tBodies[0].innerHTML = renderRows(budgetItems, idx);
}

const cancelEdit = () => {
  id = 'budgetTable';

  document.getElementById('newItem').setAttribute('disabled', false);
  document.getElementById('newAmount').setAttribute('disabled', false);
  document.getElementById('addButton').setAttribute('disabled', false);

  document.getElementById(id).tBodies[0].innerHTML = renderRows(budgetItems);
}

const save = (idx) => {

  budgetItems[idx].item = document.getElementById('editItem').value;
  budgetItems[idx].amount = parseFloat(document.getElementById('editAmount').value);

  saveBudget('my-budget');
  renderPage('budgetTable');

  document.getElementById('newItem').setAttribute('disabled', false);
  document.getElementById('newAmount').setAttribute('disabled', false);
  document.getElementById('addButton').setAttribute('disabled', false);
}

const deleteItem = (idx) => {
  const temp = [];
  for (let i=0; i < budgetItems.length; i++) {
    if (i != idx) {
      temp.push(budgetItems[i]);
    }
  }
  budgetItems = temp;

  saveBudget('my-budget');
  renderPage('budgetTable');
}

const renderPage = (id) => {
  document.getElementById(id).tBodies[0].innerHTML = renderRows(budgetItems);
  document.getElementById(id).tFoot.innerHTML = renderRow(calculateTotals(), null);
}

document.addEventListener('DOMContentLoaded', function($ev) {
  loadBudget('my-budget');
  renderPage('budgetTable');
});

document.getElementById('addButton').addEventListener('click', function($ev) {
  addBudgetItem();
  saveBudget('my-budget');
  renderPage('budgetTable');
});

document.getElementById('budgetTable').addEventListener('click', function($ev) {
  const idx = $ev.target.dataset.idx;
  if ($ev.target.className.indexOf('edit-button') > -1) {
    editBudgetItem(idx);
  } else if ($ev.target.className.indexOf('delete-button') > -1) {
    deleteItem(idx);
  } else if ($ev.target.className.indexOf('save-button') > -1) {
    save(idx);
  } else if ($ev.target.className.indexOf('cancel-button') > -1) {
    cancelEdit();
  }
});
