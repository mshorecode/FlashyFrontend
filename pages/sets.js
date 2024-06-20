import React, { useCallback, useEffect, useState } from 'react';
import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure,
} from '@nextui-org/react';
import { useAuth } from '../utils/context/authContext';
import EyeIcon from '../components/icons/EyeIcon';
import EditIcon from '../components/icons/EditIcon';
import DeleteIcon from '../components/icons/DeleteIcon';
import VerticalDotsIcon from '../components/icons/VerticalDotsIcon';
import { deleteSet, getUserSets } from '../api/setData';
import CreateSet from './set/new';
import EditSet from './set/edit/[id]';
import SetDetails from './set/[id]';

export default function SetsPage() {
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState(null);
  const [modalPlacement] = useState('center');
  const [userSets, setUserSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const columns = [
    {
      key: 'set',
      label: 'SET',
    },
    {
      key: 'favorite',
      label: 'FAVORITE',
    },
    {
      key: 'actions',
      label: 'ACTIONS',
    },
  ];

  useEffect(() => {
    getUserSets(user.id).then(setUserSets);
  }, [user.id]);

  const showDetails = (set) => {
    setSelectedSet(set);
    setSelectedModal('details');
    onOpen(true);
  };

  const createSet = () => {
    setSelectedModal('new');
    onOpen(true);
  };

  const editSet = (set) => {
    setSelectedSet(set);
    setSelectedModal('edit');
    onOpen(true);
  };

  const deleteTheSet = (set) => {
    setSelectedSet(set);
    if (window.confirm('Would you like to delete this set?')) {
      deleteSet(set.id);
      setUserSets((prevSets) => prevSets.filter((s) => s.id !== set.id));
    }
  };

  // Render Table
  const renderCell = useCallback((set, columnKey) => {
    const cellValue = set[columnKey];

    switch (columnKey) {
      case 'set':
        return (
          <div>
            <p className="text-bold text-sm">{set.title}</p>
          </div>
        );
      case 'actions':
        return (
          <>
            <div className="relative items-center gap-1 sm:flex hidden">
              <Tooltip content="Details">
                <Button onPress={() => showDetails(set)} className="bg-transparent" isIconOnly>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip content="Edit flashcard">
                <Button onPress={() => editSet(set)} className="bg-transparent" isIconOnly>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Delete flashcard">
                <Button className="bg-transparent" onPress={() => deleteTheSet(set)} isIconOnly>
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
                  <DropdownItem onPress={() => showDetails(set)}>View</DropdownItem>
                  <DropdownItem onPress={() => editSet(set)}>Edit</DropdownItem>
                  <DropdownItem onPress={() => deleteTheSet(set)}>Delete</DropdownItem>
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
    <div className="flex flex-col gap-2 justify-center my-10 mx-10">
      <div className="flex justify-end mb-2">
        <Button onPress={() => createSet()} className="w-28" size="sm">
          New
        </Button>
      </div>
      <Table aria-label="User sets">
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
        <TableBody items={userSets} emptyContent="No sets found">
          {(set) => (
            <TableRow key={set.id}>
              {(columnKey) => <TableCell>{renderCell(set, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedSet && (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement={modalPlacement} isDismissable>
          {selectedModal === 'details' && <SetDetails id={selectedSet.id} />}
          {selectedModal === 'edit' && <EditSet id={selectedSet.id} onClose={onOpenChange} />}
        </Modal>
      )}
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement={modalPlacement} isDismissable>
        {selectedModal === 'new' && <CreateSet id={selectedSet?.id} onClose={onOpenChange} />}
      </Modal>
    </div>
  );
}
