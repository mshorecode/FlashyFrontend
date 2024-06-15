import { useEffect, useState } from 'react';
import { getFlashcards } from '../api/flashcardData';
import Flashcard from '../components/Flashcard';

export default function FlashcardPage() {
  const [flashcards, setFlashcards] = useState([]);

  const renderFlashcards = async () => {
    const data = await getFlashcards();
    setFlashcards(data);
  };

  useEffect(() => {
    renderFlashcards();
  }, []);

  return (
    <div>
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} flashcard={flashcard} onUpdate={renderFlashcards} />
      ))}
    </div>
  );
}
