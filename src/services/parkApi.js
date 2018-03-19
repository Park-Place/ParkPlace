import { db } from './firebase';
import { auth } from './firebase';


// const scoresRef = db.ref('scores').orderByChild('score').limitToLast(5);

// export const onScoresList = handler => {
//   scoresRef.on('value', data => {
//     const scores = data.val();
//     if(!scores) return [];

//     const scoresSorted = Object.keys(scores).map(key => {
//       const score = scores[key];
//       score.key = key;
//       return score;
//     });
//     scoresSorted.sort((a, b) => b.score - a.score);

//     handler(scoresSorted);
//   });
// };

export const onUserStateChange = handler => {
  auth.onAuthStateChanged(user => {
    if(user) user.name = user.email.split('@')[0];
    handler(user);
  });
};

export const onSignUp = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const onSignIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const onSignOut = () => {
  return auth.signOut();
};