class UserConnection{
	constructor(aConnection,arsvp,atriptopic,aTripId,auserID ){
		this.Connection = aConnection;
    this.rsvp=arsvp;
	this.triptopic=atriptopic;
	this.TripId=aTripId;
	this.userId=auserID
	}

	get aConnection() {
		return  this.aConnection;
	  }
	
	  set aConnection(aConnection) {
		return  this.Connection=aConnection;
	  }
	  get arsvp() {
		return  this.rsvp;
	  }
	
	  set arsvp(arsvp) {
		return  this.rsvp=arsvp;
	  }
	  get aTriptopic() {
		return  this.ariptopic;
	  }
	
	  set aTriptopic(aTriptopic) {
		return  this.Triptopic=aTriptopic;
	  }
	  get aTripId() {
		return  this.TripId;
	  }
	
	  set aTripId(aTripId) {
		return  this.TripId=aTripId;
	  }
	  get auserID() {
		return  this.userID;
	  }
	
	  set auserID(auserID) {
		return  this.userID=auserID;
	  }
}

module.exports = UserConnection;