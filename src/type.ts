export type TTodoList = {
  statusCode: number;
  data: [
    {
      _id: number;
      title: string;
      description: string;
      isComplete: boolean;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    }
  ];
  message: string;
  success: boolean;
};
