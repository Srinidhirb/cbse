import React, { useState, useEffect } from "react";
import { Spinner, Tooltip, Icon, Card, CardBody, Text } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

// Utility function to extract YouTube video ID


const MyProfile = ({ userData }) => {
  const [referralUsage, setReferralUsage] = useState({});
  const [loadingReferralUsage, setLoadingReferralUsage] = useState(true);

  useEffect(() => {
    const fetchReferralUsage = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/referral-usage`);
        if (!response.ok)
          throw new Error("Failed to fetch referral usage data");
        const data = await response.json(); // data = { fullName: [list of names referred] }

        setReferralUsage(data);
        setLoadingReferralUsage(false);
      } catch (error) {
        console.error("Error fetching referral usage:", error);
        setLoadingReferralUsage(false);
      }
    };

    fetchReferralUsage();
  }, []);

  if (!userData) {
    return <div className="mt-4 text-gray-600">Loading user data...</div>;
  }
  const referredUsers = Object.entries(referralUsage)
    .filter(([_, referrals]) => referrals.includes(userData.fullName))
    .map(([referrerName]) => referrerName);
  const usersWhoUsedMyReferral = referralUsage[userData.fullName] || []; // people who used my referral code
  const referralCount = usersWhoUsedMyReferral.length;

  return (
    <div className="mx-auto">
      {/* User Info Section */}
      <div className=" p-6 bg-white border-2 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">User Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
          <Card
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "xl",
            
            }}
            padding={0}
          >
            <CardBody px={2} boxShadow={"md"} >
              <Text>
                <strong>Name:</strong> {userData.fullName}
              </Text>
            </CardBody>
          </Card>

          <Card
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "xl",
            }}
          >
            <CardBody px={2} boxShadow={"md"}>
              <Text>
                <strong>Email:</strong> {userData.emailAddress}
              </Text>
            </CardBody>
          </Card>

          <Card
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "xl",
            }}
          >
            <CardBody px={2} boxShadow={"md"}>
              <Text>
                <strong>Phone Number:</strong> {userData.phoneNumber}
              </Text>
            </CardBody>
          </Card>

          <Card
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "xl",
            }}
          >
            <CardBody px={2} boxShadow={"md"}>
              <Text>
                <strong>Gender:</strong> {userData.gender}
              </Text>
            </CardBody>
          </Card>

          <Card
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "xl",
            }}
          >
            <CardBody px={2} boxShadow={"md"}>
              <Text>
                <strong>Referral ID:</strong> {userData.referralId}
                <span className="ml-2 text-blue-500">
                  ({referralCount} used)
                  {referralCount > 0 && (
                    <Tooltip
                      label={`Users who used this referral ID: ${usersWhoUsedMyReferral.join(
                        ", "
                      )}`}
                      aria-label="Referral ID Users"
                      hasArrow
                      placement="top"
                    >
                      <span>
                        <Icon
                          as={FaInfoCircle}
                          boxSize={5}
                          color="blue.500"
                          ml={2}
                          cursor="pointer"
                        />
                      </span>
                    </Tooltip>
                  )}
                </span>
              </Text>
            </CardBody>
          </Card>

          <Card
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "xl",
            }}
          >
            <CardBody px={2} boxShadow={"md"}>
              <Text>
                <strong>Referral Reference:</strong> {userData.userReferralId}
                {referredUsers.length > 0 && (
                  <Tooltip
                    label={`Referred Users: ${referredUsers.join(", ")}`}
                    aria-label="Referred Users"
                    hasArrow
                    placement="top"
                  >
                    <span>
                      <Icon
                        as={FaInfoCircle}
                        boxSize={5}
                        color="blue.500"
                        ml={2}
                        cursor="pointer"
                      />
                    </span>
                  </Tooltip>
                )}
              </Text>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Video Section */}
     
    </div>
  );
};

export default MyProfile;
