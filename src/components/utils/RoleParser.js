function roleParser(str) {
    if (str === 'ROLE_CONSUMER') return ' Заказчик; ';
    if (str === 'ROLE_PRODUCER') return ' Исполнитель; ';
    if (str === 'ROLE_ADMIN') return ' Администратор; ';
    // else return ' Администратор; ';
}

export default roleParser;