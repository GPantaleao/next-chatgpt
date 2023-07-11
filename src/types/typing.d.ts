interface Message {
  text: string;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

interface Chat {
  chatId: string;
}

interface ModelOptions {
  value: string;
  label: string;
}

interface ModelOptions {
  value: string;
  label: string;
}

interface Model {
  modelOptions: ModelOptions[];
}
