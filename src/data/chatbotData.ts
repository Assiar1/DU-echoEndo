export interface ChatbotResponse {
    keywords: string[];
    response: string;
  }
  
  export const chatbotResponses: ChatbotResponse[] = [
    {
      keywords: ['admission', 'conditions', 'inscription', 'postuler', 'candidature'],
      response: "Le programme est ouvert aux médecins spécialistes, gastro-entérologues, et internes en dernière année de spécialisation. Un CV et une lettre de motivation sont requis pour l'inscription."
    },
    {
      keywords: ['durée', 'formation', 'temps', 'mois', 'période'],
      response: "La formation s'étend sur 12 mois, avec des modules théoriques en ligne et des sessions pratiques en présentiel réparties tout au long de l'année."
    },
    {
      keywords: ['évaluation', 'examen', 'test', 'validation', 'diplôme'],
      response: "Les évaluations comprennent des examens théoriques, des évaluations pratiques sur simulateurs, et la présentation d'un mémoire de fin de formation."
    },
    {
      keywords: ['international', 'reconnu', 'valeur', 'reconnaissance', 'accréditation'],
      response: "Oui, notre diplôme est reconnu par plusieurs associations internationales d'endoscopie digestive et offre des crédits de formation continue valables dans l'Union Européenne."
    },
    {
      keywords: ['frais', 'prix', 'coût', 'financement', 'paiement', 'euros', '€'],
      response: "Les frais d'inscription varient selon votre statut et pays d'origine. Nous proposons des tarifs préférentiels pour les médecins des pays en développement. Contactez-nous pour plus d'informations."
    },
    {
      keywords: ['contact', 'email', 'téléphone', 'joindre', 'adresse'],
      response: "Vous pouvez nous contacter par email à voiceilyas@gmail.com ou en utilisant le formulaire de contact en bas de page."
    },
    {
      keywords: ['cours', 'module', 'programme', 'contenu', 'enseignement'],
      response: "Le programme comporte des modules théoriques sur les techniques endoscopiques avancées, la sémiologie, l'apprentissage des gestes techniques sur simulateurs, et des sessions pratiques supervisées."
    },
    {
      keywords: ['stage', 'pratique', 'simulation', 'clinique', 'hôpital'],
      response: "Les sessions pratiques se déroulent dans plusieurs centres hospitaliers universitaires partenaires, avec un accès à des équipements de pointe et une supervision par des experts reconnus."
    },
  ];
  
  export const welcomeMessage = "Bonjour ! Je suis le chatbot du Diplôme Universitaire en Endoscopie Digestive. Comment puis-je vous aider ?";
  
  export const fallbackResponse = "Je ne suis pas sûr de comprendre votre question. Pourriez-vous la reformuler ? Vous pouvez me demander des informations sur les conditions d'admission, la durée de la formation, les évaluations, la reconnaissance internationale, ou les frais d'inscription.";