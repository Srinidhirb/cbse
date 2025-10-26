import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner, useToast } from "@chakra-ui/react";
import AdminNavbar from "./AdminNavbar";

const API_URL = import.meta.env.VITE_API_URL;

function Admin() {
  const [url, setUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const queryClient = useQueryClient();
  const toast = useToast();

  const MAX_VIDEOS = 9;

  const isValidYouTubeUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s]+$/.test(url);
  };

  const { data: videos = [], isLoading, isError } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/videos`);
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json();
    },
  });

  const mutation = useMutation({
    mutationFn: async (videoData) => {
      const endpoint = editId
        ? `${API_URL}/update/${editId}`
        : `${API_URL}/add`;
      const method = editId ? "PUT" : "POST";

      return fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(videoData),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["videos"]);
      toast({
        title: editId ? "Video updated successfully!" : "Video added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setUrl("");
      setEditId(null);
    },
    onError: () => {
      toast({
        title: "Failed to save video",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["videos"]);
      toast({
        title: "Video deleted successfully!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete video",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/))([^?&\n]+)/);
    return match ? match[1] : "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidYouTubeUrl(url)) {
      toast({
        title: "Invalid YouTube URL",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (videos.length >= MAX_VIDEOS && !editId) {
      toast({
        title: "Video limit reached (9 videos max)",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    mutation.mutate({ url });
  };

  const handleEdit = (video) => {
    setUrl(video.url);
    setEditId(video._id);
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center mt-12">
        <h2 className="text-2xl font-semibold mb-4">{editId ? "Edit Video" : "Add Video"}</h2>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={mutation.isLoading }
            className={`w-full mt-4 text-white font-semibold py-2 rounded-md transition duration-200 ${
              mutation.isLoading || (videos.length >= MAX_VIDEOS && !editId)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {mutation.isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Video" : "Add Video"}
          </button>
        </form>

        <h2 className="text-2xl font-semibold mt-8">Video List</h2>
        {isLoading && <Spinner size="xl" color="blue.500" className="mt-2" />}
        {isError && <p className="text-red-500 mt-2">Error fetching videos!</p>}

        <div className="w-full max-w-3xl mt-6 overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left border-b">Video</th>
                <th className="p-4 text-center border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos?.map((video) => (
                <tr key={video._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 min-w-96 border-b">{video.url}</td>
                  <td className="p-4 border-b flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(video)}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(video._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => window.open(`http://youtube.com/watch?v=${extractVideoId(video.url)}`, "_blank")}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Admin;
