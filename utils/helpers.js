module.exports = {
    format_date: (date) => {
        // return date.toLocaleDateString();
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
};