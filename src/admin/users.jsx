import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Text,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [referralUsage, setReferralUsage] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const usersPerPage = 10; // Number of users per page
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data);

        // Fetch referral usage details
        const referralResponse = await fetch(
          "http://localhost:5000/referral-usage"
        );
        if (!referralResponse.ok)
          throw new Error("Failed to fetch referral usage");

        const referralData = await referralResponse.json();
        setReferralUsage(referralData);
      } catch (err) {
        setError(err.message);
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <AdminNavbar />
      <TableContainer p={4}>
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          User List
        </Text>

        {loading ? (
          <Center>
            <Spinner size="xl" color="teal.500" />
          </Center>
        ) : error ? (
          <Center>
            <Text color="red.500">{error}</Text>
          </Center>
        ) : (
          <>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Full Name</Th>
                  <Th>Email</Th>
                  <Th>Phone Number</Th>

                  <Th>Gender</Th>

                  <Th>Referral ID</Th>
                  <Th>Used By</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <Tr key={user._id}>
                      <Td>{user.fullName}</Td>
                      <Td>{user.emailAddress}</Td>
                      <Td>{user.phoneNumber}</Td>

                      <Td>{user.gender}</Td>

                      <Td>{user.userReferralId || "N/A"}</Td>
                      <Td>
                        {Array.isArray(user.usedBy)
                          ? user.usedBy.join(", ")
                          : "Not Used"}
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="8" textAlign="center">
                      No users found
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>

            {/* Pagination Controls */}
            <Flex mt={4} justify="center" align="center" gap={4}>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1}
                colorScheme="teal"
              >
                Previous
              </Button>
              <Text>
                Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
              </Text>
              <Button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                isDisabled={indexOfLastUser >= users.length}
                colorScheme="teal"
              >
                Next
              </Button>
            </Flex>
          </>
        )}
      </TableContainer>
    </>
  );
}

export default Users;
