import { semType } from "@prisma/client";

export const seed_data: {
  symbol_num: number;
  name: string;
  roll_no: number;
  age?: number;
  interest: string[];
  sem: {
    // std_symbol_num: number;
    sem_num: number;
    sem: semType;
    subjects: string[];
    credit_hrs: number;
    CGPA: number;
  }[];
}[] = [
  {
    symbol_num: 20180058,
    name: "Biswash Dhungana",
    roll_no: 8,
    age: 24,
    interest: ["Frontend", "Backend", "web3"],
    sem: [
      {
        // std_symbol_num: 20180058,
        sem_num: 5,
        sem: "FALL",
        subjects: [
          "Simulation and Modeling",
          "System Programming",
          "Analysis and Design of Algorithms",
        ],
        credit_hrs: 17,
        CGPA: 3.894,
      },
      {
        // std_symbol_num: 20180058,
        sem_num: 6,
        sem: "SPRING",
        subjects: [
          "Computer Networks",
          "Engineering Economics",
          "Multimedia Systems",
        ],
        credit_hrs: 17,
        CGPA: 4,
      },
    ],
  },
  {
    symbol_num: 20180059,
    name: "Jane Doe",
    roll_no: 9,
    age: 23,
    interest: ["Data Science", "Machine Learning"],
    sem: [
      {
        // std_symbol_num: 20180059,
        sem_num: 5,
        sem: "FALL",
        subjects: ["Data Mining", "Machine Learning", "Statistical Methods"],
        credit_hrs: 15,
        CGPA: 3.75,
      },
      {
        // std_symbol_num: 20180059,
        sem_num: 6,
        sem: "SPRING",
        subjects: [
          "Deep Learning",
          "Big Data Analytics",
          "Natural Language Processing",
        ],
        credit_hrs: 15,
        CGPA: 3.9,
      },
    ],
  },
  {
    symbol_num: 20180060,
    name: "Alice Smith",
    roll_no: 10,
    age: 22,
    interest: ["Artificial Intelligence", "Robotics"],
    sem: [
      {
        // std_symbol_num: 20180060,
        sem_num: 5,
        sem: "FALL",
        subjects: ["Artificial Intelligence", "Robotics", "Computer Vision"],
        credit_hrs: 16,
        CGPA: 3.85,
      },
      {
        // std_symbol_num: 20180060,
        sem_num: 6,
        sem: "SPRING",
        subjects: [
          "Reinforcement Learning",
          "Human-Robot Interaction",
          "Ethics in AI",
        ],
        credit_hrs: 16,
        CGPA: 3.95,
      },
    ],
  },
  {
    symbol_num: 20180061,
    name: "Bob Johnson",
    roll_no: 11,
    age: 24,
    interest: ["Cybersecurity", "Blockchain"],
    sem: [
      {
        // std_symbol_num: 20180061,
        sem_num: 5,
        sem: "FALL",
        subjects: [
          "Cybersecurity Fundamentals",
          "Cryptography",
          "Network Security",
        ],
        credit_hrs: 14,
        CGPA: 3.8,
      },
      {
        // std_symbol_num: 20180061,
        sem_num: 6,
        sem: "SPRING",
        subjects: [
          "Blockchain Technology",
          "Smart Contracts",
          "Decentralized Applications",
        ],
        credit_hrs: 14,
        CGPA: 3.85,
      },
    ],
  },
];
