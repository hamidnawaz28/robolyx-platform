const form_structure = {
  form_name: "",
  sections: [
    {
      section_name: "Section Name",
      section_desp: "Section Description",

      questions: [
        {
          question_text: "Please write question text here",
          question_type: "Checkbox",
          options: [{ optionText: "Option1 Text" }],
          answer: false,
          answerkey: "",
          checkbox_answerkey: [false],
          points: 0,
          open: false,
          required: false,
        },
      ],
    },
  ],
};

export default form_structure;
