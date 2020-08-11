import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyCZ_njfRNJsqUjSdSv3GWalEWjhcP11L_Q",
    authDomain: "dashboard-272010.firebaseapp.com",
    databaseURL: "https://dashboard-272010.firebaseio.com",
    projectId: "dashboard-272010",
    storageBucket: "dashboard-272010.appspot.com",
    messagingSenderId: "371626425486",
	appId: "1:371626425486:web:3496662bbf237bbb855ddf",
	measurementId: "G-0BT0JQY6HP"
}

class Firebase {
	constructor() {
		//Connect to the Database
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()

		this.googleProvider = new app.auth.GoogleAuthProvider()
	}

	//Sign in
	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	signInWithGoogle () {
		return this.auth.signInWithPopup(this.googleProvider)
	}

	//Sign out
	logout() {
		return this.auth.signOut()
	}

	//Register
	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}
 
	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	//User functions
	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	getUserInfo() {
		return this.auth.currentUser
	}

	getUserImage() {
		return this.auth.currentUser.photoURL
	}


	// Orders
	async getOrders() {
		const response = await this.db.collection('orders').get()
		return response
	}

	async createOrder(newOrder) {
		const response = await this.db.collection('orders').add(newOrder)
		return response
	}

	async getOrderByID(id) {
		const response = await this.db.collection('orders').doc(id).get()
		return response
	}

	async saveOrder(id, data) {
		const response = await this.db.collection('orders').doc(id).set(data)
		return response
	}
	
	async delOrderById(id) {
		const response = await this.db.collection('orders').doc(id).delete()
		return response
	}


	//Posts
	async getPosts() {
		const response = await this.db.collection('Posts').get()
		return response
	}
}

export default new Firebase()