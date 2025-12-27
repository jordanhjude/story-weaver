import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryInteractions } from "@/components/StoryInteractions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Heart } from "lucide-react";

// Sample story content
const stories: Record<string, {
  title: string;
  themes: string[];
  readingTime: string;
  content: string[];
}> = {
  "velvet-nights": {
    title: "Velvet Nights",
    themes: ["Romance", "Reunion"],
    readingTime: "12 min",
    content: [
      "The garden had changed in five years, but the jasmine remained. Its scent drifted through the evening air as Elena pushed open the iron gate, her heart beating a rhythm she thought she had forgotten.",
      "She hadn't expected to return here. The invitation had arrived without explanation—a cream envelope, her name written in a hand she recognized immediately. Just an address. Just a time. Just enough to make her remember everything.",
      "The stone path curved beneath ancient oaks, their branches forming a canopy that filtered the last light of day into something softer, more forgiving. She had walked this path before, in another life, when love seemed simple and forever was a word they used without understanding.",
      "He stood by the fountain, exactly where she knew he would be. Time had touched him gently—silver at his temples, a certain gravity in his stance—but his eyes, when they met hers, held the same warmth that had once made her believe anything was possible.",
      "\"You came,\" he said. Not a question. A statement of wonder.",
      "\"I came.\" She stopped three steps away, close enough to see the slight tremor in his hands, far enough to maintain the distance years had built. \"Your letter didn't explain why.\"",
      "\"Some things can't be written.\" He gestured to the garden around them. \"I wanted you to remember.\"",
      "\"I never forgot.\" The words escaped before she could stop them, carrying more truth than she had intended to reveal.",
      "The fountain whispered behind him, water falling in patterns she had once traced with her fingers while he read poetry aloud. How young they had been. How certain.",
      "\"I should have followed you,\" he said. \"When you left. I should have come after you.\"",
      "\"Would it have changed anything?\"",
      "\"Everything. Nothing.\" A ghost of a smile crossed his face. \"I've thought about that night every day since. What I should have said. What I should have done differently.\"",
      "Elena felt the weight of years pressing against her chest—years of building a life elsewhere, of learning to breathe without thinking of him, of convincing herself that some loves were meant to remain unfinished.",
      "\"We were different people then,\" she said.",
      "\"Were we?\" He took a step closer, and the scent of jasmine intensified, mixing with something she remembered as uniquely his. \"Or are we finally old enough to be who we were always meant to become?\"",
      "The question hung between them like the last note of a song neither wanted to end. Around them, the garden held its breath, waiting for an answer that had been five years in the making.",
      "She closed her eyes and let herself remember: the first time he had taken her hand in this very spot, the first time they had danced without music, the first time she had understood that love could be both the simplest and most complicated thing in the world.",
      "When she opened them again, he was there—patient, hopeful, unchanged in all the ways that mattered.",
      "\"I'm not the same woman who left,\" she warned him.",
      "\"Good.\" His smile reached his eyes this time. \"Neither am I the same man who let you go.\"",
      "Somewhere in the darkness, a nightingale began to sing. Elena took the final step, closing the distance that time and fear had built, and felt his arms fold around her with a certainty that needed no words.",
      "The jasmine bloomed on, witness to what had been and what was yet to come.",
    ],
  },
  "whispers-library": {
    title: "Whispers in the Library",
    themes: ["Longing", "Connection"],
    readingTime: "8 min",
    content: [
      "The library closed at nine, but she always stayed until the lights flickered their final warning. There was something sacred about the hour between closing and leaving—the way sound softened, the way the shelves seemed to breathe.",
      "Tonight, however, she was not alone.",
      "He appeared in the poetry section, reaching for the same volume her fingers had just touched. Their hands met on the spine of Neruda, and neither pulled away.",
      "\"I'm sorry,\" he said, though his eyes held no apology. They held curiosity, and something warmer. \"You were here first.\"",
      "\"We can share.\" The words left her mouth before wisdom could intervene. \"I mean—\" She felt heat rise to her cheeks. \"I was only going to read a few pages.\"",
      "\"Which ones?\"",
      "\"The love sonnets. I always come back to them when...\" She trailed off, unwilling to finish the sentence, to admit why she sought comfort in verses about longing.",
      "He nodded as if he understood completely. \"May I sit with you? The chairs by the window have the best light this time of evening.\"",
      "They sat across from each other as the library emptied around them, passing the book back and forth, reading aloud in voices barely above whispers. His accent wrapped around the Spanish phrases like something precious, something sacred.",
      "\"You know these poems well,\" she observed.",
      "\"My grandmother used to read them to me. Before she passed, she said they contained every truth about love worth knowing.\" He paused. \"I think she was right.\"",
      "The lights flickered—five minutes until closing. Neither moved.",
      "\"What brings you here tonight?\" she asked. \"To this particular section, this particular book?\"",
      "\"Honestly?\" His smile was shy, unexpected. \"I saw you here last Tuesday. And the Tuesday before that. I've been trying to find the courage to reach for whatever book you reached for.\"",
      "Her heart performed a small revolution. \"You came for the poetry? Or for me?\"",
      "\"I came hoping they might be the same thing.\"",
      "The lights flickered again, more insistently. A librarian's footsteps approached in the distance.",
      "\"We should go,\" she said, though every part of her wished to stay.",
      "\"Yes.\" He closed the book gently, reverently. \"But tomorrow is Wednesday. And the library is open until nine.\"",
      "\"It is.\"",
      "\"Then perhaps,\" he said, standing and offering his hand to help her rise, \"we might continue where we left off.\"",
      "She took his hand, and the touch felt like the beginning of a poem she had been waiting her whole life to read.",
    ],
  },
  "secret-letter": {
    title: "The Secret Letter",
    themes: ["Mystery", "Passion"],
    readingTime: "15 min",
    content: [
      "The letter fell from between the pages of her grandmother's journal, yellowed with age but perfectly preserved. No envelope. No date. Just words in a hand she didn't recognize, addressed to a woman she thought she knew.",
      "My dearest Catherine, it began. Even now, decades later, I cannot forget the summer we met...",
      "Claire sat in the attic of the old house, dust motes floating in the afternoon light, and read the words meant for someone else. With each line, the grandmother she had known—proper, reserved, widowed young—transformed into someone entirely different.",
      "The letter spoke of secret meetings in a garden maze, of conversations that lasted until dawn, of a love that burned with such intensity it frightened them both. It spoke of a choice made one autumn night, and a goodbye that was never truly spoken.",
      "I think of you still, the writer confessed. In every sunset that reminds me of your hair, in every melody that recalls your laugh, in every silence that holds your name. I think of you, and I wonder if choosing duty over love was wisdom or the greatest cowardice of my life.",
      "The letter was signed simply: Yours, in all the ways that matter. M.",
      "Claire turned the paper over, searching for more, but there was nothing. Just these words, hidden for God knew how long, preserved by a woman who had lived out her days in apparent solitude.",
      "Who was M? Had her grandmother loved and lost before—or instead of—the grandfather Claire had never met? What had happened to the garden maze, to the dawn conversations, to the love that burned?",
      "She spent the next three weeks excavating the attic, searching for answers. More letters appeared—a dozen in total, spanning a single summer fifty years past. They painted a portrait of two people caught between passion and propriety, between what they wanted and what the world demanded.",
      "The final letter was different. Shorter. Stained with what might have been tears.",
      "Tomorrow, you marry him. Tomorrow, I leave for the continent. Tomorrow, we become the people we agreed to be, rather than the people we wished we could become. But tonight—tonight, I will stand beneath your window one last time. If you look out, I will know that what we had was real. If the curtain stays closed, I will understand, and I will never write to you again.",
      "Claire set down the letter with shaking hands. Had her grandmother looked? Had she watched M walk away, or had she kept the curtain closed, choosing the safer path?",
      "In the bottom of the trunk, beneath the letters, she found a faded photograph. Two figures in a garden—a young woman who was unmistakably her grandmother, and a man whose face had been carefully, deliberately obscured.",
      "Some mysteries, Claire realized, were meant to remain unsolved. Some loves existed only in the spaces between words, preserved in hidden letters, carried in hearts that never forgot.",
      "She gathered the letters carefully, tying them with a ribbon that might have been original, and placed them back where they had rested for half a century. Some secrets deserved their peace.",
      "But as she descended the attic stairs, she found herself wondering about her own life, about the letters she might one day leave behind, about the loves that burned and the choices yet to be made.",
    ],
  },
  "rynel-nights": {
    title: "Rynel Nights",
    themes: ["Reunion", "Main Square"],
    readingTime: "12 min",
    content: [
      "The Sukiennice glowed, a medieval behemoth breathing golden light onto the Rynek. Stone arches, carved centuries past, framed the bustling square, a tapestry of midnight revelers and horse-drawn carriages. Amidst the swirling currents of laughter and music, her gaze snagged. A familiar silhouette, sharp and unyielding as a sculptor's chisel, moved through the crowd. Three years. The world had spun on its axis a thousand times since then, but some imprints never faded.",
      "His hair, once a raven's wing, now bore streaks of silver at the temples, catching the amber streetlamp. His shoulders, broader still, strained the fabric of his dark jacket. He turned, a slow, deliberate movement, and her breath hitched. Those eyes. The same stormy grey, deep as winter twilight, now held a new, etched weariness, a knowledge she couldn't quite decipher.",
      "He saw her. Recognition flared, a jolt that seemed to ripple across the cobblestones between them. His stride faltered, then resumed, purposeful now, cutting a path through the throng. The air crackled, thick with unspoken questions, with memories that clawed at the edges of her composure.",
      "\"Elara.\" His voice, a low rumble, vibrated through her. The sound had haunted her dreams, a phantom limb she'd learned to live without.",
      "\"Kael.\" Her own voice felt thin, alien. A tremor ran through her, a current of longing she'd long suppressed. He stood before her, close enough that she could discern the faint scar above his left brow, a souvenir from a forgotten skirmish. The scent of him—leather, old books, and something wild, untamed—enveloped her, a potent intoxicant.",
      "\"You look… different,\" he observed, his gaze tracing the curve of her jaw, the slight tension around her lips.",
      "\"Three years changes things.\" Her retort was sharp, an automatic defense. \"You, too. More shadows.\"",
      "A corner of his mouth twitched, a ghost of the smile she remembered, the one that always promised trouble and exhilaration in equal measure. \"Some shadows cling. You've forgotten how to smile properly.\"",
      "\"And you've forgotten how to stay.\" The words, laced with a bitterness she hadn't realized still festered, hung in the cool night air. The crowd surged around them, oblivious to the chasm that had just opened.",
      "He didn't flinch. His eyes, however, darkened, a flicker of pain she almost missed. \"That was never my choice.\"",
      "\"Wasn't it?\" Her brow arched. \"You vanished. A note. A single, cryptic sentence. Then nothing. For three years.\" Her hand, unbidden, clenched into a fist. \"I built a life. Without you. What do you want, Kael?\"",
      "His gaze swept the square, then returned to her, intense, unwavering. \"Answers. And… you.\"",
      "\"Answers.\" She scoffed, a dry, humorless sound. \"That's convenient. After all this time.\"",
      "\"There was a reason, Elara. A damn good one. One I couldn't tell you then. One I still can't.\" His voice dropped, a hushed intensity that compelled her to lean closer. \"But I never stopped thinking of you. Not a single day.\"",
      "\"Don't. Don't say that.\" Her heart hammered against her ribs, a frantic bird trapped in a cage. \"You left me. You shattered everything.\"",
      "He reached for her, his hand hovering inches from her arm, hesitating. \"I know. And I'd give anything to undo it. But I couldn't. I was protecting you.\"",
      "\"Protecting me?\" Her laugh was sharp, brittle. \"From what? A life with you?\"",
      "\"From *them*.\" The single word was a whisper, yet it carried the weight of a thunderclap. His eyes darted, scanning the edges of the square, a hunter's instinct. \"They knew about us. They would have used you.\"",
      "\"Who are 'they'?\" The world, for a moment, seemed to tilt. The festive sounds of the Rynek faded, replaced by a sudden, unnerving silence in her mind.",
      "\"The same shadows that cling to me.\" His hand finally landed on her arm, his touch electric, sending a shiver through her. \"I need to talk to you. Somewhere private. Now.\"",
      "She hesitated, torn between a burning resentment and an undeniable pull, a yearning that had never truly died. The way he looked at her, the raw honesty in his grey eyes, it chipped away at her carefully constructed walls.",
      "\"Why should I trust you?\"",
      "\"Because you know I wouldn't lie about this.\" His thumb stroked her skin, a feather-light touch that ignited a forgotten fire. \"Because I need your help, Elara. More than you know.\"",
      "Her gaze met his, searching for the deception, for the familiar patterns of evasion. But all she saw was a desperate urgency, a vulnerability she hadn't known he possessed. The vibrant energy of the Rynek, once a comfort, now felt like a stage, too public for this raw, unfolding drama. She nodded, a silent, unwilling surrender.",
      "\"Lead the way, then, Kael.\" Her voice, though still laced with suspicion, held a tremor of something else: anticipation. The game, it seemed, was far from over. And a part of her, the part that remembered the intoxicating danger of him, thrilled at the prospect.",
    ],
  },
};

export default function StoryReader() {
  const { id } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const story = stories[id || "velvet-nights"];
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  if (!story) {
    return (
      <div className="min-h-screen bg-background velvet-texture flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-4">Story not found</h1>
          <Link to="/stories" className="text-rose hover:text-rose/80">
            Return to all stories
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background velvet-texture">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-border/30">
        <div 
          className="h-full bg-rose transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <article className="reading-container">
          {/* Back link */}
          <Link 
            to="/stories" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 text-sm font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            All stories
          </Link>
          
          {/* Header */}
          <header className="mb-16 animate-fade-in-up">
            <div className="flex flex-wrap gap-3 mb-6">
              {story.themes.map((theme) => (
                <span 
                  key={theme}
                  className="text-xs text-rose/80 tracking-widest uppercase font-body"
                >
                  {theme}
                </span>
              ))}
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground tracking-wide mb-6">
              {story.title}
            </h1>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-2 text-sm font-body">
                <Clock className="w-4 h-4" />
                {story.readingTime} read
              </span>
            </div>
          </header>
          
          {/* Story content */}
          <div className="story-prose animate-fade-in-up delay-200">
            {story.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {/* Interactions - Likes and Comments */}
          <StoryInteractions storyId={id || "velvet-nights"} />
          
          {/* End section */}
          <footer className="mt-16 pt-12 border-t border-border/30">
            <p className="text-center text-muted-foreground font-body italic mb-12">
              — The End —
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                className="bg-rose hover:bg-rose/90 text-primary-foreground px-8 py-6 font-body tracking-wide"
              >
                <Link to="/stories">
                  <Heart className="w-4 h-4 mr-2" />
                  Read another story
                </Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>
      
      <SiteFooter />
    </div>
  );
}
