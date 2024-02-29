import React, { useEffect, useState } from "react";
import deleteicon from "../../../assets/icons/delete.svg";
import save from "../../../assets/icons/save.svg";
import { toast } from "react-toastify";
import { Delete } from "../../../Axios/UserServer/UserServer";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const PostAction = ({ email, post, handleChange=()=>{} }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleAction = (id) => {
    console.log(id);
    const res = Delete(id)
    res.then(response => {
      toast.success('Item deleted successfully');
      handleChange(id)
    }).catch(error => {
      console.error('Error deleting item:', error);
    });
  };
  useEffect(() => {
   console.log('refresh');
  }, [handleAction])
  

  console.log(email);
  return (
    <div className="flex items-end justify-end z-20">
      <div className="flex gap-2">
        {email === post.user.email ? (
          <img
            src={deleteicon}
            alt="delete"
            height={20}
            width={20}
            onClick={onOpen}
            className="cursor-pointer"
          />
        ) : (
          <img
            src={save}
            alt="save"
            height={20}
            width={20}
            onClick={() => {}}
            className="cursor-pointer"
          />
        )}
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange} className="bg-dark-4">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Post</ModalHeader>
              <ModalBody>
                <p> 
                  Are you sure to delete this post?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={()=>handleAction(post.id)} onPress={onClose}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostAction;
