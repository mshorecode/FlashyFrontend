import { useCallback, useEffect, useState } from 'react';
import {
  Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { deleteFlashcard, getUserFlashcards } from '../api/flashcardData';
import EyeIcon from '../components/icons/EyeIcon';
import EditIcon from '../components/icons/EditIcon';
import DeleteIcon from '../components/icons/DeleteIcon';
import { useAuth } from '../utils/context/authContext';
import FlashcardDetails from './flashcard/[id]';
import VerticalDotsIcon from '../components/icons/VerticalDotsIcon';
import EditFlashcard from './flashcard/edit/[id]';
import CreateFlashcard from './flashcard/new';

export default function FlashcardPage() {
  const { user } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState(null);
  const [modalPlacement] = useState('center');
  const [flashcards, setFlashcards] = useState([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const columns = [
    {
      key: 'flashcard',
      label: 'FLASHCARD',
    },
    {
      key: 'set',
      label: 'SET',
    },
    {
      key: 'actions',
      label: 'ACTIONS',
    },
  ];

  useEffect(() => {
    getUserFlashcards(user.id).then(setFlashcards);
  }, [user.id]);

  const showDetails = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setSelectedModal('details');
    onOpen(true);
  };

  const createFlashcard = () => {
    setSelectedModal('new');
    console.warn('your modal is set to', selectedModal);
    onOpen(true);
  };

  const editFlashcard = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setSelectedModal('edit');
    onOpen(true);
  };

  const deleteTheFlashcard = (flashcard) => {
    setSelectedFlashcard(flashcard);
    if (window.confirm('Would you like to delete this flashcard?')) {
      deleteFlashcard(flashcard.id);
      setFlashcards((prevFlashcards) => prevFlashcards.filter((fc) => fc.id !== flashcard.id));
    }
  };

  // Render table
  const renderCell = useCallback((flashcard, columnKey) => {
    const cellValue = flashcard[columnKey];

    switch (columnKey) {
      case 'flashcard':
        return (
          <div>
            <p className="text-bold text-sm">{flashcard.question}</p>
          </div>
        );
      case 'actions':
        return (
          <>
            <div className="relative items-center gap-1 sm:flex hidden">
              <Tooltip content="Details">
                <Button onPress={() => showDetails(flashcard)} className="bg-transparent" isIconOnly>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip content="Edit flashcard">
                <Button onPress={() => editFlashcard(flashcard)} className="bg-transparent" isIconOnly>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Delete flashcard">
                <Button className="bg-transparent" onPress={() => deleteTheFlashcard(flashcard)} isIconOnly>
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
                  <DropdownItem onPress={() => showDetails(flashcard)}>View</DropdownItem>
                  <DropdownItem onPress={() => editFlashcard(flashcard)}>Edit</DropdownItem>
                  <DropdownItem onPress={() => deleteTheFlashcard(flashcard)}>Delete</DropdownItem>
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
        <Button onPress={() => createFlashcard()} className="w-28">
          New
        </Button>
      </div>
      <Table aria-label="User flashcards">
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
        <TableBody items={flashcards} emptyContent="No flashcards found">
          {(flashcard) => (
            <TableRow key={flashcard.id}>
              {(columnKey) => <TableCell>{renderCell(flashcard, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedFlashcard && (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement={modalPlacement} isDismissable isKeyboardDismissDisabled>
          {selectedModal === 'details' && <FlashcardDetails id={selectedFlashcard.id} />}
          {selectedModal === 'edit' && <EditFlashcard id={selectedFlashcard.id} onClose={onOpenChange} />}
        </Modal>
      )}
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement={modalPlacement} isDismissable isKeyboardDismissDisabled>
        {selectedModal === 'new' && <CreateFlashcard id={selectedFlashcard?.id} onClose={onOpenChange} />}
      </Modal>
    </div>
  );
}
