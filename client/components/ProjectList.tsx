import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Project {
    id: number;
    title: string;
    category: string;
    status: string;
    image_url: string;
}

interface ProjectListProps {
    onEdit: (project: any) => void; // Pass full project object or ID
    onAddNew: () => void;
}

export default function ProjectList({ onEdit, onAddNew }: ProjectListProps) {
    const { toast } = useToast();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            toast({
                variant: "destructive",
                title: "Error fetching projects",
                description: error.message,
            });
        } else {
            setProjects(data || []);
        }
        setIsLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this project? This cannot be undone.")) return;

        console.log("Deleting project ID:", id);
        const { error, data } = await supabase
            .from("projects")
            .delete()
            .eq("id", id)
            .select();

        // Check for RLS silent failure
        if (!error && (!data || data.length === 0)) {
            toast({
                variant: "destructive",
                title: "Delete failed",
                description: "No records deleted. This is likely a permission (RLS) issue.",
            });
            return;
        }

        if (error) {
            toast({
                variant: "destructive",
                title: "Error deleting project",
                description: error.message,
            });
        } else {
            toast({
                title: "Project deleted",
                description: "The project has been removed successfully.",
            });
            fetchProjects(); // Refresh list
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold font-outfit text-text-color">Projects</h2>
                    <p className="text-gray-500">Manage your portfolio projects.</p>
                </div>
                <Button onClick={onAddNew} className="bg-text-color hover:bg-orange text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add New Project
                </Button>
            </div>

            {/* Content Container */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">

                {/* 1. DESKTOP VIEW (Table) - Hidden on Mobile */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50">
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                                        Loading projects...
                                    </TableCell>
                                </TableRow>
                            ) : projects.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                        No projects found. Create your first one!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                projects.map((project) => (
                                    <TableRow key={project.id} className="hover:bg-gray-50 transition-colors">
                                        <TableCell>
                                            <div className="h-12 w-16 bg-gray-100 rounded overflow-hidden">
                                                <img
                                                    src={project.image_url}
                                                    alt={project.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-text-color">{project.title}</TableCell>
                                        <TableCell>{project.category}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${project.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : project.status === "ongoing"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {project.status === "not-started" ? "Not Started" : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-blue-600 border-blue-200 hover:bg-blue-50"
                                                    onClick={() => onEdit(project)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 border-red-200 hover:bg-red-50"
                                                    onClick={() => handleDelete(project.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* 2. MOBILE VIEW (Cards) - Visible on Mobile Only */}
                <div className="md:hidden">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">Loading projects...</div>
                    ) : projects.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No projects found. Create your first one!</div>
                    ) : (
                        <div className="divide-y">
                            {projects.map((project) => (
                                <div key={project.id} className="p-4 flex gap-4 items-start">
                                    {/* Thumbnail */}
                                    <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-text-color truncate pr-2">{project.title}</h3>
                                            <span
                                                className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${project.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : project.status === "ongoing"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {project.status === "not-started" ? "Not Started" : project.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2 truncate">{project.category}</p>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                                                onClick={() => onEdit(project)}
                                            >
                                                <Edit className="h-3 w-3 mr-2" /> Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 flex-shrink-0 text-red-500 border-red-200 hover:bg-red-50 p-0"
                                                onClick={() => handleDelete(project.id)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
