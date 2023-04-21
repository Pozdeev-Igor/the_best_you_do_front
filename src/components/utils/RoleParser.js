function roleParser(str) {
    if (str === 'ROLE_CONSUMER') return ' Заказчик; ';
    if (str === 'ROLE_PRODUCER') return ' Исполнитель; ';
    else return ' Администратор; ';
}

export default roleParser;