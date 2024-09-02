import axios from "axios";
import { useEffect, useState } from "react";
import DisplayApiKeys from "./DisplayApiKeys";
import { useAppSelector } from "../../store/stateHook";

interface ApiKeyDataTypes {
  jwt_secret: string;
  telegram_bot_token: string;
  weather_api_key: string;
}

function ApiComponent() {
  const token = useAppSelector((state) => state.auth.token);
  const [apiKeysData, setApiKeysData] = useState<ApiKeyDataTypes>({
    jwt_secret: "",
    telegram_bot_token: "",
    weather_api_key: "",
  });

  const [originalApiKeysData, setOriginalApiKeysData] =
    useState<ApiKeyDataTypes>(apiKeysData);
  const [isEdited, setIsEdited] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const getApiKeys = async () => {
      try {
        const response = await axios.get<ApiKeyDataTypes>(
          "http://localhost:3000/api",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { jwt_secret, telegram_bot_token, weather_api_key } =
          response.data;
        setApiKeysData({ jwt_secret, telegram_bot_token, weather_api_key });
        setOriginalApiKeysData({
          jwt_secret,
          telegram_bot_token,
          weather_api_key,
        }); // Save the original data
      } catch (error) {
        console.error(
          "ERROR: Error while fetching API KEYS from the database.",
          error
        );
      }
    };
    getApiKeys();
  }, []);

  const handleChange = (key: keyof ApiKeyDataTypes, value: string) => {
    const updatedData = { ...apiKeysData, [key]: value };
    setApiKeysData(updatedData);
    setIsEdited(
      JSON.stringify(updatedData) !== JSON.stringify(originalApiKeysData)
    );
  };

  const handleSave = async () => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/save",
        data: apiKeysData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOriginalApiKeysData(apiKeysData); // Update original data to the new saved state
      setIsEdited(false);
    } catch (error) {
      console.error(
        "ERROR: Error while saving API KEYS to the database.",
        error
      );
    }
  };

  const handleDiscard = () => {
    setApiKeysData(originalApiKeysData);
    setIsEdited(false);
    setShowWarning(false);
  };

  const handleSaveButtonClick = () => {
    setShowWarning(true);
  };

  return (
    <div className="flex flex-grow h-full flex-col bg-red-400">
      <div className="flex flex-col flex-grow justify-center items-center">
        <div className="max-w-3xl mx-auto  p-8 bg-red-200 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">API Keys</h1>

          <div className="relative bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6">
            <span className="block sm:inline">
              Caution: Make sure you handle your API keys with care to prevent
              breaking the application.
            </span>
          </div>

          <div className="space-y-6">
            {Object.entries(apiKeysData).map(([key, value]) => (
              <DisplayApiKeys
                key={key}
                keyName={key.replace(/_/g, " ").toUpperCase()}
                keyValue={value}
                onChange={(value: string) =>
                  handleChange(key as keyof ApiKeyDataTypes, value)
                }
              />
            ))}
          </div>
          <div className="mt-8 flex justify-end gap-4">
            <button
              className={`px-6 py-3 rounded-lg text-lg font-semibold ${
                isEdited
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isEdited}
              onClick={handleSaveButtonClick}
            >
              Save Changes
            </button>
          </div>

          {showWarning && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <p className="mb-4 text-lg font-semibold text-red-600">
                  Warning: Saving these keys might expose sensitive data. Are
                  you sure you want to proceed?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    onClick={handleDiscard}
                  >
                    Discard
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleSave}
                  >
                    Confirm Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApiComponent;
