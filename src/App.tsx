import { useState } from "react";
import "./App.css";

interface Question {
  id: number;
  text: string;
  options: Array<{
    text: string;
    value: string;
  }>;
}

const questions: Question[] = [
  {
    id: 1,
    text: "How do you kick off a coding sprint?",
    options: [
      { text: "Yip excitedly while imagining yourself as a cyber-wolf.", value: "furry" },
      { text: "Spend 45 minutes aligning your IDE tabs to exactly 4 spaces.", value: "autistic" },
      { text: "Blast RuPaul's \"Sissy That Walk\" for inspiration.", value: "gay" },
      { text: "Say a quick prayer for bug-free code and start typing.", value: "mormon" }
    ]
  },
  {
    id: 2,
    text: "Favorite prototyping tool:",
    options: [
      { text: "A whiteboard blessed with dry-erase markers and good intentions.", value: "mormon" },
      { text: "Blender, so you can 3D-print a furry avatar mid-sprint.", value: "furry" },
      { text: "VS Code with 17 extensions for maximum efficiency, no lag allowed.", value: "autistic" },
      { text: "Figma, because it's as fabulous as your wireframes.", value: "gay" }
    ]
  },
  {
    id: 3,
    text: "Your reaction to a crashing prototype:",
    options: [
      { text: "\"I've already identified the error in line 42, column 6.\"", value: "autistic" },
      { text: "\"Werk it, we'll pivot to something fiercer!\"", value: "gay" },
      { text: "\"Let's stay calm and debug this as a team.\"", value: "mormon" },
      { text: "*growls at the screen, then scratches behind imaginary ears*", value: "furry" }
    ]
  },
  {
    id: 4,
    text: "Favorite Austin hangout after a late-night coding session:",
    options: [
      { text: "Zilker Park to run around like a wild animal.", value: "furry" },
      { text: "A quiet café with herbal tea and no loud music.", value: "mormon" },
      { text: "Rainey Street for glittery vibes and craft cocktails.", value: "gay" },
      { text: "The exact same desk, because leaving disrupts your workflow.", value: "autistic" }
    ]
  },
  {
    id: 5,
    text: "How do you name your variables?",
    options: [
      { text: "var_001, var_002, in strict sequential order.", value: "autistic" },
      { text: "pawsomeTail and furrySpeed.", value: "furry" },
      { text: "slayQueenX and fierceDivY.", value: "gay" },
      { text: "blessedInt and righteousStr.", value: "mormon" }
    ]
  },
  {
    id: 6,
    text: "Your AI chatbot's personality would be:",
    options: [
      { text: "A polite helper quoting wisdom from old tech manuals.", value: "mormon" },
      { text: "A literal machine giving precise, unembellished answers.", value: "autistic" },
      { text: "A playful pup who responds with barks and emojis.", value: "furry" },
      { text: "A sassy diva who throws shade at bad inputs.", value: "gay" }
    ]
  },
  {
    id: 7,
    text: "Favorite rapid prototyping snack in Austin:",
    options: [
      { text: "Torchy's Tacos with extra rainbow salsa.", value: "gay" },
      { text: "Exactly 12 unsalted almonds, counted twice.", value: "autistic" },
      { text: "Homemade granola bars from a family recipe.", value: "mormon" },
      { text: "Beef jerky you pretend to hunt near Barton Springs.", value: "furry" }
    ]
  },
  {
    id: 8,
    text: "How do you celebrate a successful demo?",
    options: [
      { text: "Howl at the moon from the rooftop of the Arena.", value: "furry" },
      { text: "Pop a bottle of sparkling cider and vogue in the lab.", value: "gay" },
      { text: "Silently nod, then optimize the code 3% more.", value: "autistic" },
      { text: "Share a wholesome \"great job\" with the team and a high-five.", value: "mormon" }
    ]
  },
  {
    id: 9,
    text: "Your laptop sticker vibe:",
    options: [
      { text: "\"Faith in Functions\" in elegant script.", value: "mormon" },
      { text: "Glittery unicorns and \"Code Like a Queen.\"", value: "gay" },
      { text: "Paw prints and a snarling fox in a headset.", value: "furry" },
      { text: "No stickers—scratches disrupt the surface tension.", value: "autistic" }
    ]
  },
  {
    id: 10,
    text: "Your ideal weekend hackathon setup:",
    options: [
      { text: "A cozy corner with your favorite plushie and RGB keyboard.", value: "furry" },
      { text: "A perfectly organized desk with color-coded sticky notes.", value: "autistic" },
      { text: "A glamorous setup with disco lights and a mini-fridge of energy drinks.", value: "gay" },
      { text: "A clean workspace with healthy snacks and motivational quotes.", value: "mormon" }
    ]
  }
];

const houses = {
  gay: { name: "Vanguard", image: "/vanguard.png" },
  mormon: { name: "Innovators", image: "/innovator.png" },
  furry: { name: "Catalysts", image: "/catalyst.png" },
  autistic: { name: "Alchemists", image: "/alchemist.png" }
};

const characteristicMap = {
  gay: "🌈 Gay",
  mormon: "🙏 Mormon",
  furry: "🐺 Furry",
  autistic: "🧮 Autistic"
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateResult = () => {
    const counts = { gay: 0, mormon: 0, furry: 0, autistic: 0 };
    Object.values(answers).forEach(value => {
      counts[value as keyof typeof counts]++;
    });

    let maxCount = 0;
    let dominantCharacteristic = "gay"; // Default in case of tie
    Object.entries(counts).forEach(([char, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantCharacteristic = char;
      }
    });

    return dominantCharacteristic;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const result = calculateResult();
      setResult(result);
    }
  };

  const shareResult = () => {
    if (!result) return;
    const house = houses[result as keyof typeof houses];
    
    const shareText = `I've been sorted into the ${house.name} house at Gauntlet AI!\n\nTake the quiz to discover your house:`;
    const shareUrl = `https://sortinghat.tigerpanda.tv/results/${house.name.toLowerCase()}.html`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  if (result) {
    const house = houses[result as keyof typeof houses];
    return (
      <main className="container">
        <div className="result">
          <h2>Your dominant characteristic is {characteristicMap[result as keyof typeof characteristicMap]}!<br />
          Welcome to your new house, the {house.name}</h2>
          <img src={house.image} alt={`${house.name} house`} />
          <button onClick={shareResult} className="share-button">
            Share on X
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Gauntlet AI House Sorting Quiz</h1>
      <p className="intro-text">Answer these questions to find your house at Gauntlet AI!</p>
      
      <div className="question">
        <p>{questions[currentQuestion].text}</p>
        {questions[currentQuestion].options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`q${questions[currentQuestion].id}`}
              value={option.value}
              checked={answers[questions[currentQuestion].id] === option.value}
              onChange={() => handleAnswer(questions[currentQuestion].id, option.value)}
            />
            {option.text}
          </label>
        ))}
      </div>

      <button 
        onClick={handleNext}
        disabled={!answers[questions[currentQuestion].id]}
      >
        {currentQuestion === questions.length - 1 ? "Get Result" : "Next Question"}
      </button>
    </main>
  );
}

export default App;
