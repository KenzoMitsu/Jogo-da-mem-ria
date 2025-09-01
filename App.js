import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const generateShuffledDeck = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const deck = [...numbers, ...numbers] // pares de números
      .map((num, index) => ({ id: index, value: num, matched: false, flipped: false }))
      .sort(() => Math.random() - 0.5); // embaralha
  return deck;
};

export default function MemoryGame() {
  const [deck, setDeck] = useState(generateShuffledDeck());
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [canSelect, setCanSelect] = useState(true);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setCanSelect(false);
      const [first, second] = selectedCards;
      if (deck[first].value === deck[second].value) {
        // acerto - marca como matched e soma pontos
        const newDeck = deck.map((card, idx) =>
            idx === first || idx === second ? { ...card, matched: true } : card
        );
        setDeck(newDeck);
        setScore(score + 10);
        setSelectedCards([]);
        setCanSelect(true);
      } else {
        // erro - vira as cartas de volta após um tempo e perde pontos
        setScore(score - 3);
        setTimeout(() => {
          const newDeck = deck.map((card, idx) =>
              idx === first || idx === second ? { ...card, flipped: false } : card
          );
          setDeck(newDeck);
          setSelectedCards([]);
          setCanSelect(true);
        }, 1000);
      }
    }
  }, [selectedCards]);

  const flipCard = (index) => {
    if (!canSelect) return;
    if (deck[index].flipped || deck[index].matched) return;
    const newDeck = deck.slice();
    newDeck[index].flipped = true;
    setDeck(newDeck);
    setSelectedCards([...selectedCards, index]);
  };

  const renderCard = ({ item, index }) => (
      <TouchableOpacity
          style={[styles.card, item.flipped || item.matched ? styles.cardFlipped : styles.cardUnflipped]}
          onPress={() => flipCard(index)}
          disabled={item.flipped || item.matched}
      >
        <Text style={styles.cardText}>{item.flipped || item.matched ? item.value : "?"}</Text>
      </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Jogo da Memória - Pontuação: {score}</Text>
        <FlatList
            data={deck}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            extraData={deck}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: {
    width: 70,
    height: 70,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444",
  },
  cardUnflipped: {
    backgroundColor: "#888",
  },
  cardFlipped: {
    backgroundColor: "#4caf50",
  },
  cardText: {
    fontSize: 30,
    color: "#fff",
  },
});
