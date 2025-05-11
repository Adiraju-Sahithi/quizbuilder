import React, { useState } from 'react';

const subjects = ['HTML', 'Java', 'C'];
const topicTypes = ['Multiple Choice', 'True/False', 'Choose Correct Answer'];

const questions = {
  HTML: [
    { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Marking Language', 'Home Tool Markup Language'], answer: 0 },
    { question: 'HTML is used to?', options: ['Create web pages', 'Style web pages', 'Run JavaScript'], answer: 0 },
  ],
  Java: [
    { question: 'Java is a?', options: ['Compiled language', 'Markup language', 'Database'], answer: 0 },
  ],
  C: [
    { question: 'C is used in?', options: ['System programming', 'Web design', 'None'], answer: 0 },
  ],
};

function App() {
  const [step, setStep] = useState('login');
  const [accepted, setAccepted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleLogin = () => {
    if (accepted && credentials.username && credentials.password) {
      setLoggedIn(true);
      setStep('subject');
    }
  };

  const handleAnswer = (i) => {
    const correct = questions[subject][qIndex].answer === i;
    if (correct) setScore(score + 1);
    setAnswers([...answers, i]);
    if (qIndex + 1 < questions[subject].length) {
      setQIndex(qIndex + 1);
    } else {
      setStep('result');
    }
  };

  if (!loggedIn) {
    return (
      <div style={styles.page}>
        <header style={styles.header}>
          <h1 style={styles.title}>Quiz Builder</h1>
          <div style={styles.login}>
            <div style={styles.loginTopRight}>
              <input
                type="text"
                placeholder="Username"
                style={styles.input}
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
              <button
                style={{
                  ...styles.loginBtn,
                  backgroundColor: accepted ? '#4CAF50' : '#ccc',
                  cursor: accepted ? 'pointer' : 'not-allowed',
                }}
                onClick={handleLogin}
                disabled={!accepted}
              >
                Login
              </button>
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.section}>
            <h2>Instructions</h2>
            <ul>
              <li>Welcome to Quiz Builder - create or attempt quizzes based on various topics.</li>
              <li><strong>No time limit</strong> for completing the quiz.</li>
              <li>Ensure stable internet during the quiz session.</li>
              <li>Choose a subject and topic after login.</li>
            </ul>
          </div>

          <div style={styles.section}>
            <h2>Terms and Conditions</h2>
            <ul>
              <li>You agree not to share quiz content outside the platform.</li>
              <li>Cheating or using unfair means will result in disqualification.</li>
              <li>Login credentials must be kept confidential.</li>
            </ul>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label>
              <input type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)} />
              &nbsp; I accept the terms and conditions
            </label>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'subject') {
    return (
      <div style={styles.page}>
        <header style={styles.header}><h1 style={styles.title}>Quiz Builder</h1></header>
        <main style={styles.main}>
          <div style={styles.section}>
            <h2>Select Subject</h2>
            <div style={styles.column}>
              {subjects.map((subj) => (
                <button key={subj} style={styles.option} onClick={() => { setSubject(subj); setStep('topic'); }}>
                  {subj}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'topic') {
    return (
      <div style={styles.page}>
        <header style={styles.header}><h1 style={styles.title}>Quiz Builder</h1></header>
        <main style={styles.main}>
          <div style={styles.section}>
            <h2>Select Topic Type</h2>
            <div style={styles.column}>
              {topicTypes.map((type) => (
                <button key={type} style={styles.option} onClick={() => setStep('quiz')}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'quiz') {
    const q = questions[subject][qIndex];
    return (
      <div style={styles.page}>
        <header style={styles.header}><h1 style={styles.title}>Quiz Builder</h1></header>
        <main style={styles.main}>
          <div style={styles.section}>
            <h2>Question {qIndex + 1}</h2>
            <p>{q.question}</p>
            <div style={styles.column}>
              {q.options.map((opt, i) => (
                <button key={i} style={styles.option} onClick={() => handleAnswer(i)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div style={styles.page}>
        <header style={styles.header}><h1 style={styles.title}>Quiz Builder</h1></header>
        <main style={styles.main}>
          <div style={styles.section}>
            <h2>Quiz Completed!</h2>
            <p>Thank you for completing the quiz!</p>
          </div>
        </main>
      </div>
    );
  }

  return null;
}

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 30px',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
  },
  login: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  loginTopRight: {
    display: 'flex',
    gap: '10px',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  input: {
    padding: '5px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  loginBtn: {
    padding: '5px 10px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
  },
  main: {
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
  },
  section: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '15px',
  },
  option: {
    width: '100%',
    padding: '15px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#eee',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default App;
