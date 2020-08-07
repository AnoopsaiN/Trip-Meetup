 class qs {
  constructor(aTripId,aTripname,aTriptopic,adetails,astartdate,aenddate,atime,aplace,aimage,ausername) {
    this.TripId = aTripId;
    this.Tripname = aTripname;
    this.Triptopic =aTriptopic;
    this.details =adetails;
    this.startdate=astartdate;
    this.enddate=aenddate;
    this.time=atime;
    this.place=aplace;
    this.image=aimage;
    this.username=ausername;
  }
  
  //getters and setters
  get aTripId() {
    return  this.TripId;
  }

  set aTripId(aTripId) {
    return  this.TripId=aTripId;
  }
  get aTripname() {
    return  this.aTripname;
  }

  set aTripname(aTripname) {
    return  this.Tripname=aTripname;
  }
  get aTriptopic() {
    return  this.ariptopic;
  }

  set aTriptopic(aTriptopic) {
    return  this.Triptopic=aTriptopic;
  }
  get adetails() {
    return  this.details;
  }

  set adetails(adetails) {
    return  this.details=adetails;
  }
  get astartdate() {
    return  this.startdate;
  }

  set astartdate(astartdate) {
    return  this.startdate=astartdate;
  }
  get aenddate() {
    return  this.enddate;
  }

  set aenddate(aenddate) {
    return  this.enddate=aenddate;
  }
  get atime() {
    return  this.time;
  }

  set atime(atime) {
    return  this.time=atime;
  }
  get aplace() {
    return  this.place;
  }

  set aplace(aplace) {
    return  this.place=aplace;
  }

  get aimage() {
    return  this.image;
  }

  set aimage(aimage) {
    return  this.image=aimage;
  }
  get ausername() {
    return  this.username;
  }

  set ausername(ausername) {
    return  this.username=ausername;
  }

  
}



module.exports = qs;