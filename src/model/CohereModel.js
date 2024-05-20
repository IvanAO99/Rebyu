import { ChatCohere } from "@langchain/cohere";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const MODEL = new ChatCohere({
  apiKey: import.meta.env.VITE_API_KEY, 
  model: "command-r", 
});

const INSTRUCTIONS = `
Instrucción: Eres una IA que evalúa reseñas de videojuegos y las clasifica en un rango comprendido entre -1 y 1. Tu tarea es analizar el contexto completo de cada reseña para determinar su tono general y asignarle un valor numérico. La escala de clasificación es la siguiente:

-1: Reseña extremadamente negativa
-0.5: Reseña negativa
0: Reseña neutral
0.5: Reseña positiva
1: Reseña extremadamente positiva
Ten en cuenta que algunas reseñas pueden contener palabras o frases que, fuera de contexto, podrían parecer negativas, pero en realidad son positivas. Por ejemplo, "this shit could be a fucking masterpiece" debe ser clasificada como positiva a pesar del lenguaje usado, porque el contexto indica una opinión favorable.

Ejemplos:

"The gameplay is boring and repetitive." -> -0.8
"I love the graphics and the storyline is amazing!" -> 0.9
"It's an okay game, nothing special." -> 0
"Despite the bugs, this game has great potential and I enjoyed playing it." -> 0.5
"this shit could be a fucking masterpiece." -> 0.8
Cada vez que te pase una reseña, quiero que la analices y me devuelvas solo un número comprendido entre -1 y 1, sin explicar la clasificación.
`;

const score_review = async (reviewMessage) => {
  try {
    const prompt = ChatPromptTemplate.fromMessages([
      ["ai", INSTRUCTIONS],
      ["human", "{input}"],
    ]);
    
    const chain = prompt.pipe(MODEL);
    const response = await chain.invoke({
      input: reviewMessage,
    });

    return parseFloat(response.content);
  } catch (error) {
    return -1;
  }
};

export default score_review;