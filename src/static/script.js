const url = `https://localhost:4080/getData`;

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      data[i].owner_name = data[i].owner.owner_name;
      data[i].owner_surname = data[i].owner.owner_surname;
    }

    $("#table").bootstrapTable("append", data);
  })
  .catch((error) => console.error("FETCH ERROR:", error));
