class User{
  constructor(aUserID, afirstname, alastname, aemailaddress, aaddress1field, aaddress2field, acity, astate, azipcode, acountry) {
    this.UserID = aUserID;
    this.firstname = afirstname;
    this.lastname = alastname;
    this.emailaddress = aemailaddress;
    this.address1field = aaddress1field;
    this.address2field = aaddress2field;
    this.city = acity;
    this.state = astate;
    this.zipcode = azipcode;
    this.country = acountry;
  }
  getaUserID() {
    return  this.UserID;
  }

  setaUserID(aUserID) {
    return  this.UserID=aUserID;
  }
  getafirstname() {
    return  this.firstname;
  }

  setafirstname(afirstname) {
    return  this.firstname=afirstname;
  }
  getalastname() {
    return  this.lastname;
  }

  setalastname(alastname) {
    return  this.lastname=alastname;
  }
  getaemailaddress() {
    return  this.emailaddress;
  }

  setaemailaddress(aemailaddress) {
    return  this.emailaddress=aemailaddress;
  }
  getaaddress1field() {
    return  this.address1field;
  }

  setaaddress1field(aaddress1field) {
    return  this.address1field=aaddress1field;
  }
  getaaddress2field() {
    return  this.aaddress2field;
  }

  setaaddress2field(aaddress2field) {
    return  this.address2field=aaddress2field;
  }
  getacity() {
    return  this.city;
  }

  setacity(acity) {
    return  this.city=acity;
  }
  getastate() {
    return  this.state;
  }

  setastate(astate) {
    return  this.state=astate;
  }

  getazipcode() {
    return  this.zipcode;
  }

  setazipcode(azipcode) {
    return  this.zipcode=azipcode;
  }
  getacountry() {
    return  this.country;
  }

  setacountry(acountry) {
    return  this.country=acountry;
  }

  
}
module.exports = User
;