import formModel from "./formModel";
const {
  formField: { category, tags, trades, diversity, payment_term },
} = formModel;

export default {
  [category.name]: [],
  [tags.name]: [],
  [trades.name]: [],
  [diversity.name]: [],
  [payment_term.name]: [],
};
