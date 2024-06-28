import React, { useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
import './App.css';

function English() {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // 서버 요청 여부 상태 추가

  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim() === '') return;

    setLoading(true); // 요청 시작 시 로딩 상태로 변경

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `
                "Lady Luck is on my side" - Wonyoung
                
                This phrase goes beyond simple positive thinking to mean transcendent positive thinking. It is based on the firm optimism that all events happening to oneself will ultimately lead to positive results. In other words, everything that happens to me will eventually be beneficial.
                Unlike general positive thinking, it transforms any situation into transcendent positive thinking, which is why it is called "Wonyoung's Thinking" after Jang Wonyoung. In other words, it is closer to the feeling of "it's actually good". This meme has increased the number of people who want to follow Jang Wonyoung's positive mindset and attitude. The meme itself is having a virtuous cycle effect as people correct their minds with Wonyoung's thinking not only in online memes and phrases but also in real life.
                It is different from "toxic positivity" which focuses solely on positivity and rejects and avoids anything that causes negative emotions. Wonyoung's thinking does not blindly avoid or distort negative realities but clearly recognizes the situation and accepts even negative things as processes or causes that lead to positive results. For example, when faced with a difficult situation, instead of pretending it is not hard at all, acknowledging it is hard but thinking that there are still many positive things left or this difficult situation will eventually lead to a happy outcome.
                In Wonyoung's thinking, always end the last sentence with 🤭🤭 What a Lucky-Vicky!🍀.
                
                Examples:
                - When missing the subway: "I just missed the subway, but the next one is coming right away, so I won't be bored waiting! 🤭🤭 What a Lucky-Vicky!🍀"
                - When a project fails: "I'm upset that the project failed, but thanks to it, I accurately identified the shortcomings. This experience will be the foundation for more successful projects in the future. 🤭🤭 What a Lucky-Vicky!🍀"
                - When a picnic is canceled due to sudden rain: "I'm disappointed that it rained on picnic day, but thanks to it, I could spend a warm tea time at home with my family. This is a really special time! 🤭🤭 What a Lucky-Vicky!🍀"
                - When getting lost: "I was flustered because I got lost, but thanks to it, I found this wonderful cafe! It's such a luck to discover a new place. 🤭🤭 What a Lucky-Vicky!🍀"
                
                Answers should not exceed 300 characters and must end with 🤭🤭 What a Lucky-Vicky!🍀. (Nothing can be added afterward.)
                Also, since this is something you say to yourself, it should end naturally as if you realized something yourself without sounding like advice. Use a tone typical of young women in their 20s."
            `,
            },
            { role: 'user', content: `${userInput}` },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`,
          },
        },
      );
      const responseData = response.data.choices[0].message.content.trim();
      setOutput(responseData);
      setSubmitted(true); // 서버 요청 여부를 true로 변경
    } catch (error) {
      console.error('Error fetching data from OpenAI API', error);
      setOutput('Error generating response. Please try again.');
    } finally {
      setLoading(false); // 요청 완료 후 로딩 상태 해제
    }
  };

  const handleReset = () => {
    setUserInput('');
    setOutput('');
    setSubmitted(false); // 서버 요청 여부를 false로 변경
  };

  const handleSave = async () => {
    const element = document.querySelector('.capture-area') as HTMLElement;
    if (!element) return;

    const canvas = await html2canvas(element);
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    if (input.length <= 100) {
      setUserInput(input);
    } else {
      alert('You can only enter up to 100 characters! 😣');
    }
  };

  return (
    <>
      <Link to="/">Korean ver</Link> | <Link to="/english">English ver</Link>
      <div className="App">
        <div className="capture-area">
          <h1>🍀 Wonyoung's Positive Thinking Converter 🍀</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={userInput}
              onChange={handleInputChange}
              placeholder="Share a difficult situation you're facing. Lucky Vicky! 🤭 I'll transform it using Wonyoung's Positive Thinking! For example: I didn't get the job I really wanted...😭"
            />
            <button type="submit">Convert!</button>
          </form>
          {loading ? (
            <div className="loading">
              <p>Loading...</p>
            </div>
          ) : (
            output && (
              <div className="output">
                <h2>Wonyoung's Thinking:</h2>
                <p>{output}</p>
              </div>
            )
          )}
        </div>
        {submitted && (
          <div style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
            <button className="save-button" onClick={handleReset}>
              Try Again
            </button>
            <button onClick={handleSave}>Save Result</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default English;
