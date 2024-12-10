import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useTranslation } from "react-i18next";
import CategoryService from "../../service/CategoryService";
import categoryStyle from "./Category.module.css";

const Category = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({ name: "", observation: "" });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const categoryService = new CategoryService();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const data = await categoryService.list();
            setCategories(data);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: t("error"),
                detail: t("error-fetching-categories"),
            });
        } finally {
            setLoading(false);
        }
    };

    const openNew = () => {
        setCategory({ name: "", observation: "" });
        setDialogVisible(true);
        setIsEdit(false);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const saveCategory = async () => {
        try {
            if (isEdit) {
                await categoryService.update(category);
                toast.current.show({ severity: "success", summary: t("updated"), detail: t("category-updated-successfully") });
            } else {
                await categoryService.insert(category);
                toast.current.show({ severity: "success", summary: t("created"), detail: t("category-created-successfully") });
            }
            loadCategories();
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: t("error"),
                detail: t("error-saving-category"),
            });
        } finally {
            hideDialog();
        }
    };

    const editCategory = (category) => {
        setCategory({ ...category });
        setDialogVisible(true);
        setIsEdit(true);
    };

    const confirmDeleteCategory = (category) => {
        confirmDialog({
            message: `${t("remove-category")} "${category.name}"?`,
            header: t("confirmation"),
            icon: "pi pi-exclamation-triangle",
            accept: () => deleteCategory(category),
        });
    };

    const deleteCategory = async (category) => {
        try {
            await categoryService.delete(category.id);
            toast.current.show({ severity: "warn", summary: t("removed"), detail: t("category-removed-successfully") });
            loadCategories();
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: t("error"),
                detail: t("error-removing-category"),
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
                    onClick={() => editCategory(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded"
                    severity="danger"
                    onClick={() => confirmDeleteCategory(rowData)}
                />
            </>
        );
    };

    const dialogFooter = (
        <div>
            <Button label={t("cancel")} icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label={t("save")} icon="pi pi-check" className="p-button-text" onClick={saveCategory} />
        </div>
    );

    return (
        <div className={`
            ${categoryStyle['category-background']}
            p-grid 
            p-justify-center
            h-screen`}>
            <Toast ref={toast} />
            <ConfirmDialog acceptLabel={t("yes")} rejectLabel={t("no")}/>
          
            <div style={{ margin: '0 50px' }}>
                <DataTable
                    value={categories}
                    loading={loading}
                >
                    <Column field="name" header={t("name")}></Column>
                    <Column field="observation" header={t("observation")}></Column>
                    <Column body={actionBodyTemplate} header={t("actions")} style={{ width: '150px' }}></Column>
                </DataTable>
            </div>

            <Dialog
                visible={dialogVisible}
                style={{ width: "30vw" }}
                header={isEdit ? t("edit-category") : t("new-category")}
                modal
                footer={dialogFooter}
                onHide={hideDialog}
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">{t("name")}</label>
                        <InputText
                            id="name"
                            value={category.name}
                            onChange={(e) => setCategory({ ...category, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="observation">{t("observation")}</label>
                        <InputText
                            id="observation"
                            value={category.observation}
                            onChange={(e) => setCategory({ ...category, observation: e.target.value })}
                        />
                    </div>
                </div>
            </Dialog>

            <Button 
                icon="pi pi-plus" 
                className={`${categoryStyle.floatingButton} p-button-rounded`}
                severity="success"
                onClick={openNew} 
            />
        </div>
    );
};

export default Category;
