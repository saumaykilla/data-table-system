"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Skeleton } from '../components/ui/skeleton';

// --- TYPES & DUMMY DATA ---
interface User {
    id: string;
    name: string;
    avatar: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
    bio: string;
}

const dummyData: User[] = [
    { id: 'usr-001', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1762522926157-bcc04bf0b10a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwcm9maWxlJTIwcGljdHVyZXxlbnwwfDB8fHwxNzY1NTU2ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080', email: 'john.doe@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-10-26T10:00:00Z', bio: 'Lead developer with over 10 years of experience in creating scalable web applications.' },
    { id: 'usr-002', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1639986162505-c9bcccfc9712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8MHx8fDE3NjU1NTY4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080', email: 'jane.smith@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-10-25T14:30:00Z', bio: 'Content specialist focusing on digital marketing and SEO strategies.' },
    { id: 'usr-003', name: 'Peter Jones', avatar: 'https://images.unsplash.com/photo-1762522926157-bcc04bf0b10a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwcHJvZmlsZSUyMHBpY3R1cmV8ZW58MHwwfHx8MTc2NTU1NjgzNnww&ixlib=rb-4.1.0&q=80&w=1080', email: 'peter.jones@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2023-09-12T11:00:00Z', bio: 'Graphic designer with a passion for clean and modern aesthetics.' },
    { id: 'usr-004', name: 'Mary Johnson', avatar: 'https://images.unsplash.com/photo-1540033410216-d33365abb6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmZW1hbGUlMjBwcm9maWxlJTIwcGljdHVyZXxlbnwwfDB8fHwxNzY1NTU2ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080', email: 'mary.j@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-10-26T09:00:00Z', bio: 'Project manager overseeing the new platform launch.' },
    { id: 'usr-005', name: 'David Williams', avatar: 'https://images.unsplash.com/photo-1723537742563-15c3d351dbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBoZWFkc2hvdHxlbnwwfDB8fHwxNzY1NTU2ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080', email: 'd.williams@example.com', role: 'Admin', status: 'Pending', lastLogin: '2023-10-20T18:45:00Z', bio: 'DevOps engineer ensuring system stability and performance.' },
    { id: 'usr-006', name: 'Linda Brown', avatar: 'https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDB8MHx8fDE3NjU1NTU2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080', email: 'linda.brown@example.com', role: 'Viewer', status: 'Active', lastLogin: '2023-10-24T16:20:00Z', bio: 'QA tester dedicated to finding and squashing bugs.' },
    { id: 'usr-007', name: 'James Miller', avatar: 'https://images.unsplash.com/photo-1615843423179-bea071facf96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdXNlciUyMGF2YXRhcnxlbnwwfDB8fHwxNzY1NTU2ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080', email: 'james.miller@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2023-08-30T10:15:00Z', bio: 'Frontend developer specializing in React and Vue.' },
    { id: 'usr-008', name: 'Patricia Davis', avatar: 'https://images.unsplash.com/photo-1615843423179-bea071facf96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB1c2VyJTIwYXZhdGFyfGVufDB8MHx8fDE3NjU1NTY4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080', email: 'patricia.d@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-10-26T11:30:00Z', bio: 'Chief Technology Officer guiding the tech vision.' },
    { id: 'usr-009', name: 'Robert Garcia', avatar: 'https://images.unsplash.com/photo-1608391957733-08caeb461b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8MHx8fDE3NjU1NTY4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080', email: 'robert.g@example.com', role: 'Viewer', status: 'Pending', lastLogin: '2023-10-21T12:00:00Z', bio: 'Data analyst turning numbers into actionable insights.' },
    { id: 'usr-010', name: 'Jennifer Rodriguez', avatar: 'https://images.unsplash.com/photo-1607256703438-7e8d8b8f7d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBoZWFkc2hvdHxlbnwwfDB8fHwxNzY1NTU2ODM4fDA&ixlib=rb-4.1.0&q=80&w=1080', email: 'jen.rod@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-10-26T13:00:00Z', bio: 'UX/UI designer crafting intuitive user experiences.' },
];

const ITEMS_PER_PAGE = 5;

const MotionTableRow = motion(TableRow);

type SortingState = {
    key: keyof User | '';
    order: 'asc' | 'desc';
};

export default function AdvancedDataTableSystem() {
    const [data, setData] = useState<User[]>(dummyData);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');
    const [sorting, setSorting] = useState<SortingState>({ key: 'name', order: 'asc' });
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<User>();
    
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const searchMatch = Object.values(item).some(val =>
                String(val).toLowerCase().includes(globalFilter.toLowerCase())
            );
            const statusMatch = statusFilter === 'all' || item.status.toLowerCase() === statusFilter;
            const roleMatch = roleFilter === 'all' || item.role.toLowerCase() === roleFilter;
            return searchMatch && statusMatch && roleMatch;
        });
    }, [data, globalFilter, statusFilter, roleFilter]);

    const sortedData = useMemo(() => {
        const sorted = [...filteredData];
        if (sorting.key) {
            sorted.sort((a, b) => {
                // @ts-ignore - We know key is valid because of the type, but strict access might complain if not careful
                const aValue = a[sorting.key as keyof User];
                // @ts-ignore
                const bValue = b[sorting.key as keyof User];
                
                if (aValue < bValue) return sorting.order === 'asc' ? -1 : 1;
                if (aValue > bValue) return sorting.order === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sorted;
    }, [filteredData, sorting]);

    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedData, currentPage]);

    const handleSort = (key: keyof User) => {
        setSorting(prev => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSelectAll = (checked: boolean | "indeterminate") => {
        if (checked === true) {
            setSelectedRows(paginatedData.map(row => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id: string) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const toggleRowExpansion = (id: string) => {
        setExpandedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };
    
    const handleOpenAddModal = () => {
        setEditingUser(null);
        reset({ name: '', email: '', role: 'Viewer', status: 'Pending' });
        setIsAddEditModalOpen(true);
    };
    
    const handleOpenEditModal = (user: User) => {
        setEditingUser(user);
        reset(user);
        setIsAddEditModalOpen(true);
    };

    const handleOpenDeleteModal = (user: User) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };
    
    const handleFormSubmit = (formData: User) => {
        if (editingUser) {
            setData(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        } else {
            const newUser: User = { 
                ...formData, 
                id: `usr-${String(data.length + 1).padStart(3, '0')}`,
                avatar: `https://i.pravatar.cc/150?u=usr-${data.length+1}`,
                lastLogin: new Date().toISOString(),
                bio: 'Newly added user.'
            };
            setData(prev => [newUser, ...prev]);
        }
        setIsAddEditModalOpen(false);
    };

    const handleDeleteUser = () => {
        if (!userToDelete) return;
        setData(prev => prev.filter(u => u.id !== userToDelete.id));
        setSelectedRows(prev => prev.filter(id => id !== userToDelete.id));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const handleBulkDelete = () => {
        setData(prev => prev.filter(user => !selectedRows.includes(user.id)));
        setSelectedRows([]);
    };
    
    const isAllOnPageSelected = paginatedData.length > 0 && selectedRows.length === paginatedData.length && paginatedData.every(row => selectedRows.includes(row.id));

    return (
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm font-sans">
            
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
                <div className="relative w-full sm:w-72">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <Input
                        type="text"
                        placeholder="Search all records..."
                        className="pl-9"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
                <Button onClick={handleOpenAddModal} className="w-full sm:w-auto">
                    <i className="fas fa-plus mr-2"></i>
                    Add New
                </Button>
            </div>

            <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-md min-h-[60px]">
                {selectedRows.length > 0 ? (
                    <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-medium text-blue-600">{selectedRows.length} items selected</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    Bulk Actions <i className="fas fa-chevron-down ml-2 text-xs"></i>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={handleBulkDelete} className="text-red-500">
                                    <i className="fas fa-trash-alt mr-2"></i> Delete Selected
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <i className="fas fa-file-export mr-2"></i> Export Selected
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className="flex flex-wrap items-center gap-4">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Filter by Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                 <div className="block md:hidden p-4 text-center text-sm text-gray-500 bg-yellow-50 rounded-md">
                    For a better experience, please use a larger screen. The table below is scrollable.
                </div>
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow>
                            <TableHead className="w-12"><Checkbox checked={isAllOnPageSelected} onCheckedChange={handleSelectAll} /></TableHead>
                            <TableHead className="w-12"></TableHead>
                            <TableHead onClick={() => handleSort('name')} className="cursor-pointer hover:bg-gray-100">
                                User {sorting.key === 'name' && <i className={`ml-2 fas fa-arrow-${sorting.order === 'asc' ? 'up' : 'down'}`}></i>}
                            </TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead onClick={() => handleSort('role')} className="hidden lg:table-cell cursor-pointer hover:bg-gray-100">
                                Role {sorting.key === 'role' && <i className={`ml-2 fas fa-arrow-${sorting.order === 'asc' ? 'up' : 'down'}`}></i>}
                            </TableHead>
                            <TableHead className="hidden lg:table-cell">Last Login</TableHead>
                            <TableHead className="w-20 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                    <TableCell><div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-full" /><Skeleton className="h-4 w-32" /></div></TableCell>
                                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-40" /></TableCell>
                                    <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-48 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <i className="fas fa-search text-4xl text-gray-300"></i>
                                        <h3 className="font-semibold">No records found</h3>
                                        <p className="text-gray-500 text-sm">Your search or filter criteria did not match any records.</p>
                                        <Button variant="outline" className="mt-2" onClick={() => { setGlobalFilter(''); setStatusFilter('all'); setRoleFilter('all'); }}>Clear Filters</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map(user => (
                                <React.Fragment key={user.id}>
                                    <TableRow className={`transition-colors ${selectedRows.includes(user.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                                        <TableCell><Checkbox checked={selectedRows.includes(user.id)} onCheckedChange={() => handleSelectRow(user.id)} /></TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" onClick={() => toggleRowExpansion(user.id)}>
                                                <motion.i
                                                    className="fas fa-chevron-right text-xs"
                                                    animate={{ rotate: expandedRows.includes(user.id) ? 90 : 0 }}
                                                ></motion.i>
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover"/>
                                                <div>
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>{user.status}</span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">{user.role}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{new Date(user.lastLogin).toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <i className="fas fa-ellipsis-v"></i>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onSelect={() => handleOpenEditModal(user)}>
                                                        <i className="fas fa-pencil-alt w-4 mr-2"></i> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onSelect={() => handleOpenDeleteModal(user)} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                                        <i className="fas fa-trash-alt w-4 mr-2"></i> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <AnimatePresence>
                                        {expandedRows.includes(user.id) && (
                                            <MotionTableRow
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="bg-gray-50 hover:bg-gray-50"
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <TableCell colSpan={7}>
                                                    <div className="p-4">
                                                        <h4 className="font-semibold mb-2">Additional Information</h4>
                                                        <p className="text-sm text-gray-600">{user.bio}</p>
                                                    </div>
                                                </TableCell>
                                            </MotionTableRow>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                    Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, sortedData.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, sortedData.length)} of {sortedData.length}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)}>
                        <i className="fas fa-chevron-left"></i>
                    </Button>
                    <span className="text-sm">Page {currentPage} of {totalPages}</span>
                    <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(c => c + 1)}>
                        <i className="fas fa-chevron-right"></i>
                    </Button>
                </div>
            </div>

            <Dialog open={isAddEditModalOpen} onOpenChange={setIsAddEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                        <DialogDescription>
                            {editingUser ? 'Update the details for the existing user.' : 'Fill in the form to create a new user.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input id="name" {...register('name', { required: 'Name is required' })} className="mt-1" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="mt-1" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="role" className="text-sm font-medium">Role</label>
                                    <Controller
                                        name="role"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger id="role" className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Admin">Admin</SelectItem>
                                                    <SelectItem value="Editor">Editor</SelectItem>
                                                    <SelectItem value="Viewer">Viewer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                     <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger id="status" className="mt-1">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Active">Active</SelectItem>
                                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">{editingUser ? 'Save Changes' : 'Create User'}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the user record for <span className="font-semibold">{userToDelete?.name}</span>.
                        </DialogDescription>
                    </DialogHeader>
                     <DialogFooter>
                        <DialogClose asChild>
                           <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={handleDeleteUser}>Yes, delete user</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}