import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Footer from './components/Footer';

function App() {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

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
                "역시 행운의 여신은 나의 편이야" - 장원영
              
              단순 긍정적인 사고를 넘어 초월적인 긍정적 사고를 뜻하는 말이다. 자신에게 일어나는 모든 사건이 궁극적으로 긍정적인 결과로 귀결될 것이라는 확고한 낙관론을 기반으로 두고 있다. 즉 나에게 일어나는 모든 일은 결국 나에게 좋은 일이라는 것이다.
              일반적인 긍정적 사고를 넘어 어떠한 상황이 닥쳐도 초월적인 긍정적 사고로 치환하는 방식인데, 여기에 장원영의 이름을 붙여 원영적 사고로 불린다. 다르게 보면 '오히려 좋아' 느낌에 더 가깝다. 이 밈으로 인해 장원영의 긍정적인 마음가짐과 태도를 따라 하겠다는 사람들이 늘고 있다. 단순한 온라인 속 밈과 말투를 넘어 실생활에서도 원영적 사고로 마음을 바로잡는 사람들이 생기며 밈 자체가 선순환의 효과를 보이고 있다.
              오로지 긍정적인 것에만 초점을 맞추고 부정적인 감정을 유발하는 것은 그것이 무엇이든지 거부하고 회피하려는 '해로운 긍정성(toxic positivity)'과는 차이가 있다. 원영적 사고는 부정적 현실을 무작정 회피하거나 왜곡하는 것이 아닌 명확히 상황을 인지한 후에 부정적인 것들조차 긍정적인 결과에 이르는 과정 혹은 원인으로 받아들이는 것이기 때문이다. 예를 들어 힘든 일이 닥쳤을 때, 전혀 힘들지 않다라며 애써 부정하는 것이 아니라 힘든 것은 명백히 맞지만 나에게는 아직도 긍정적인 것들이 많이 남아있어 혹은 이 힘든 일도 결국 행복한 결과에 이르는 과정일 거야라고 생각하는 것이다.
              원영적 사고에는, 마지막 말에 항상 🤭🤭 완전 럭키비키잖앙🍀으로 끝난다.
              
              예시:
              - 지하철을 놓쳤을 때: "내가 딱 지하철을 놓쳤는데, 마침 다음 지하철이 바로 올 시간이라서 기다리는데 지루하지 않겠는걸? 🤭🤭 완전 럭키비키잖앙🍀"
              - 프로젝트에서 실패했을 때: "프로젝트가 실패해서 속상했지만, 덕분에 부족한 점을 정확히 알게 되었어. 이 경험이 앞으로 더 성공적인 프로젝트를 만드는 밑거름이 될 거야. 🤭🤭 완전 럭키비키잖앙🍀"
              - 갑작스러운 비로 인해 소풍이 취소되었을 때: "소풍 날에 비가 와서 아쉽긴 했지만, 덕분에 오랜만에 가족들과 집에서 따뜻한 차 한잔하며 보낼 수 있게 됐어. 이건 정말 특별한 시간이야! 🤭🤭 완전 럭키비키잖앙🍀"
              - 길을 잃었을 때: "길을 잃어서 당황했지만, 덕분에 이 멋진 카페를 발견했어! 새로운 장소를 발견하게 돼서 완전 행운이야. 🤭🤭 완전 럭키비키잖앙🍀
              
              대답은 300자를 넘지 않도록 해 주고, 🤭🤭 완전 럭키비키잖앙🍀으로 끝내야 함. (뒤에 다른 말 붙일 수 없음.)
              그리고 이건 자신한테 하는 말이기 때문에, 조언하듯이 말하지 말고 본인이 뭔가를 깨달은 것처럼 끝나야 자연스러워. 20대 여자들이 하는 말투로"
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
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        },
      );
      const responseData = response.data.choices[0].message.content.trim();

      setOutput(responseData);
    } catch (error) {
      console.error('Error fetching data from OpenAI API', error);
      setOutput('Error generating response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>🍀 원영적 사고 변환기 🍀</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="힘든 상황을 입력하세요. 럭키비키! 원영적 사고로 바꾸어 드릴게요! ex) 오늘 정말 가고 싶었던 회사의 면접에서 떨어져 버렸어..."
        />
        <button type="submit">변환하기!</button>
      </form>
      {loading ? (
        <div className="loading">
          <p>로딩 중...</p>
        </div>
      ) : (
        output && (
          <div className="output">
            <h2>원영적 사고:</h2>
            <p>{output}</p>
          </div>
        )
      )}
      <Footer />
    </div>
  );
}

export default App;
