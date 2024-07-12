const clientInterface = {
  idclient: Date.now(),
  firstName: "",
  lastName: "",
  function: "",
  tel: "",
  email: "",
  companyName: "",
  addr1: "",
  addr2: "",
  zip: "",
  city: "",
  country: "",
  createdAt: new Date().toISOString().slice(0, 10),
}

export { clientInterface }
