import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, Skeleton, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure,
} from '@nextui-org/react';
import { useAuth } from '../utils/context/authContext';
import {
  createTag, deleteTag, getUserTags,
} from '../api/tagData';
import EditIcon from '../components/icons/EditIcon';
import DeleteIcon from '../components/icons/DeleteIcon';
import VerticalDotsIcon from '../components/icons/VerticalDotsIcon';
import EditTag from './tag/edit/[id]';

export default function TagManager() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ label: '' });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState(null);
  const [modalPlacement] = useState('center');
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const columns = [
    {
      key: 'tag',
      label: 'TAG',
    },
    {
      key: 'actions',
      label: 'ACTIONS',
    },
  ];

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      getUserTags(user.id).then(setTags).then(setIsLoaded(true));
    } else {
      setTimeout(() => {
        getUserTags(user.id).then(setTags).then(setIsLoaded(true));
      }, 1500);
    }
  }, [tags, user.id]);

  const editTag = (tag) => {
    setSelectedTag(tag);
    setSelectedModal('edit');
    onOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      userId: user.id,
    };
    createTag(payload);
    setFormData({
      label: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const deleteTheTag = (tag) => {
    setSelectedTag(tag);
    if (window.confirm('Would you like to delete this tag?')) {
      deleteTag(tag.id);
      setTags((prevTags) => prevTags.filter((t) => t.id !== tag.id));
    }
  };

  const renderCell = useCallback((tag, columnKey) => {
    const cellValue = tag[columnKey];

    switch (columnKey) {
      case 'tag':
        return (
          <div>
            <p className="text-bold text-sm">{tag.label}</p>
          </div>
        );
      case 'actions':
        return (
          <>
            <div className="relative items-center gap-1 sm:flex hidden">
              <Tooltip content="Edit Tag">
                <Button onPress={() => editTag(tag)} className="bg-transparent" isIconOnly>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Delete Tag">
                <Button className="bg-transparent" onPress={() => deleteTheTag(tag)} isIconOnly>
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Button>
              </Tooltip>
            </div>

            <div className="relative flex justify-end items-center gap-2 sm:hidden">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onPress={() => editTag(tag)}>Edit</DropdownItem>
                  <DropdownItem onPress={() => deleteTheTag(tag)}>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </>
        );
      default:
        return cellValue;
    }
  });

  return (
    <div className=" mx-10 my-10 md:mx-56">
      <div className="flex flex-col-reverse md:flex-row gap-10">
        <Table aria-label="User tags">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                align={column.key === 'actions' ? 'center' : 'end'}
                className={column.key === 'actions' ? 'actions-sizing text-center' : ''}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          {!isLoaded ? (
            <TableBody>
              <TableRow>
                <TableCell>
                  <Skeleton isLoaded={isLoaded} className="h-6 w-full rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton isLoaded={isLoaded} className="h-6 w-full rounded-md" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton isLoaded={isLoaded} className="h-6 w-full rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton isLoaded={isLoaded} className="h-6 w-full rounded-md" />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody items={tags}>
              {(tag) => (
                <TableRow key={tag.id}>
                  {(columnKey) => <TableCell>{renderCell(tag, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
        {selectedTag && (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement={modalPlacement} isDismissable>
          {selectedModal === 'edit' && <EditTag id={selectedTag.id} onClose={onOpenChange} />}
        </Modal>
        )}

        <div className="flex flex-col w-full md:w-[50%] ">
          <form onSubmit={handleSubmit}>
            <Input
              autoFocus
              isRequired
              label="Create a new tag"
              labelPlacement="outside"
              name="label"
              value={formData.label}
              onChange={handleChange}
              variant="bordered"
              radius="sm"
              className="w-full"
            />
            <Spacer />
            <Button
              color="primary"
              size="md"
              type="submit"
              className="mt-2 w-24 h-8 font-bold text-md rounded-lg"
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
