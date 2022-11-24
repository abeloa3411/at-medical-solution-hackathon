import ussdMenu from "ussd-builder";

const ussdPost = (req, res) => {
  let menu = new ussdMenu();
  let patient = {}

  menu.startState({
    run: () => {
      menu.con(`Welcome to our self service medical platform:
             \n1. Add prescription 
             \n2. Check prescription
             \n3. Talk to a Doctor
             \n4. Create Account`);
    },
    next: {
      1: "Add prescription",
      2: "Check prescription",
      3: "Talk to a doctor",
      4: "Create Account",
    },
  });

  menu.state("Add prescription", {
    run: () => {
      menu.con("Enter your Hospital id");
    },

    next: {
      "*\\d+": "prescription.name",
    },
  });

  menu.state("prescription.name", {
    run: () => {
      let id = menu.val
      patient.id = id 
      menu.con(`Patient: ${menu.val} Please Enter the drug name`);
    },
    next: {
      "/[^a-zA-Z]+/": "prescription.dose",
    },
  });

  menu.state("prescription.dose", {
    run: () => {
      let drugName = menu.val;
      patient.drugName = drugName;
      menu.con("Enter the dose as written by the doctor");
    },
    next: {
      "/^[a-zA-Z0-9_]+$/": "end",
    },
  });

  menu.state("end", {
    run: () => {
      let drugDose = menu.val;
      patient.dose = drugDose;
      menu.end("Thank you, You will recieve a confirmation message for you prescription")
    },
  });

  return menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
};

export default ussdPost;
