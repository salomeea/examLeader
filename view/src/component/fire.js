import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyBbW5dNIyN6_SyQqPlmiNdZusKe2pdXt70",
    authDomain: "examleader-583b2.firebaseapp.com",
    projectId: "examleader-583b2",
    storageBucket: "examleader-583b2.appspot.com",
    messagingSenderId: "330630240660",
    appId: "1:330630240660:web:42c526a081b9a4f4289781"
  };
  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);
  export default fire