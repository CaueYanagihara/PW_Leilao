import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useTranslation } from "react-i18next";
import AuctionService from "../../service/AuctionService";
import myAuctionsStyle from "./MyAuctions.module.css";

const MyAuctions = () => {
    const { t } = useTranslation();
    const [auctions, setAuctions] = useState([]);
    const [auction, setAuction] = useState({ title: "", description: "" });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const auctionService = new AuctionService();

    useEffect(() => {
        loadAuctions();
    }, []);

    const loadAuctions = async () => {
        setLoading(true);
        try {
            const data = await auctionService.list();
            setAuctions(data);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: t("error"),
                detail: t("error-fetching-auctions"),
            });
        } finally {
            setLoading(false);
        }
    };

    const openNew = () => {
        setAuction({ title: "", description: "" });
        setDialogVisible(true);
        setIsEdit(false);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const saveAuction = async () => {
        try {
            if (isEdit) {
                await auctionService.update(auction);
                toast.current.show({ severity: "success", summary: t("updated"), detail: t("auction-updated-successfully") });
            } else {
                await auctionService.insert(auction);
                toast.current.show({ severity: "success", summary: t("created"), detail: t("auction-created-successfully") });
            }
            loadAuctions();
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: t("error"),
                detail: t("error-saving-auction"),
            });
        } finally {
            hideDialog();
        }
    };

    const editAuction = (auction) => {
        setAuction({ ...auction });
        setDialogVisible(true);
        setIsEdit(true);
    };

    const confirmDeleteAuction = (auction) => {
        confirmDialog({
            message: `${t("remove-auction")} "${auction.title}"?`,
            header: t("confirmation"),
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteAuction(auction),
        });
    };

    const deleteAuction = async (auction) => {
        try {
            await auctionService.delete(auction.id);
            toast.current.show({ severity: "warn", summary: t("removed"), detail: t("auction-removed-successfully") });
            loadAuctions();
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: t("error"),
                detail: t("error-removing-auction"),
            });
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded mr-2"
                    severity="warning"
                    onClick={() => editAuction(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded"
                    severity="danger"
                    onClick={() => confirmDeleteAuction(rowData)}
                />
            </>
        );
    };

    const dialogFooter = (
        <div>
            <Button label={t("cancel")} icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label={t("save")} icon="pi pi-check" className="p-button-text" onClick={saveAuction} />
        </div>
    );

    return (
        <div className={`
            flex
            align-items-center 
            justify-content-center
            w-full
            min-h-screen`}>
            <div className={`
                ${myAuctionsStyle.background}
                z-0
                w-full
                h-full
                fixed
                top-0
                left-0`}>

            </div>
            <div className={`
                ${myAuctionsStyle['myAuctions-background']}
                z-1
                p-grid 
                p-justify-center
                w-screen
                h-screen`}>
                <Toast ref={toast} />
                <ConfirmDialog acceptLabel={t("yes")} rejectLabel={t("no")}/>
            
                <div className={`${myAuctionsStyle.list}`}>
                    <DataTable
                        value={auctions}
                        loading={loading}
                    >
                        <Column field="title" header={t("title")}></Column>
                        <Column field="description" header={t("description")}></Column>
                        <Column body={actionBodyTemplate} header={t("actions")} style={{ width: '150px' }}></Column>
                    </DataTable>
                </div>

                <Dialog
                    visible={dialogVisible}
                    style={{ width: "30vw" }}
                    header={isEdit ? t("edit-auction") : t("new-auction")}
                    modal
                    footer={dialogFooter}
                    onHide={hideDialog}
                >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="title">{t("title")}</label>
                        <InputText
                            id="title"
                            value={auction.title}
                            onChange={(e) => setAuction({ ...auction, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">{t("description")}</label>
                        <InputText
                            id="description"
                            value={auction.description}
                            onChange={(e) => setAuction({ ...auction, description: e.target.value })}
                        />
                    </div>
                </div>
                </Dialog>

                <Button 
                    icon="pi pi-plus" 
                    className={`
                        ${myAuctionsStyle.floatingButton} 
                        flex
                        align-items-center 
                        justify-content-center
                        fixed
                        p-button-rounded`}
                    severity="success"
                    onClick={openNew} 
                />
            </div>
        </div>
    );
};

export default MyAuctions;