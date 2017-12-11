const fs = require('fs');
const { query } = require('./util/db');

async function selectData () {
    let sql = 'select * from _mysql_session_store';
    let resulte = await query( sql );
    return resulte;
}

async function getData() {
    let dataList = await selectData();
    console.log(dataList);
}

getData();