module.exports = {
  format_date: (exhibition) => {
    let [month, date, year] = new Date(exhibition)
      .toLocaleDateString("en-US")
      .split("/");

    let closeYear = parseInt(year);

    return `${month}/${date}/${closeYear}`;
  },
};
