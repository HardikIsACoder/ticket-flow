import TicketForm from "@/app/(components)/TicketForm";

const getTicketById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get ticket.");
  }

  return res
    .json()
    .then((data) => {
      // console.log("Data from API:", data); // Check the response data
      return data;
    })
    .catch((error) => {
      // console.error("Error parsing JSON:", error);
      throw error;
    });
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    // console.log("Ticket data:", updateTicketData);
    updateTicketData = updateTicketData.foundTicket;
    // console.log("Update ticket data:", updateTicketData);
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  // console.log(EDITMODE, updateTicketData);
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
