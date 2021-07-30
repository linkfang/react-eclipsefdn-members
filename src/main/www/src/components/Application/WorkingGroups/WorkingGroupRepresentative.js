import Input from '../../UIComponents/Inputs/Input';
import { formField } from '../../UIComponents/FormComponents/formFieldModel';

/**
 * Render Working Group Representative input component
 *
 * - Props:
 *   - name: fieldName (for Effective Date, an example would be: `workingGroups[i].workingGroupRepresentative`); this is handled by and passed from WorkingGroup component
 *
 *   - formField: the form field in formModels/formFieldModel.js
 */
const WorkingGroupRepresentative = ({ name, index, formik }) => {
  const { workingGroupRepresentative } = formField;
  const theIndex = index;
  return (
    <>
      <h3 className="fw-600 margin-top-30 h4" id={name}>
        Who is the working group representative?
        <span className="orange-star margin-left-5">*</span>
      </h3>
      <div className="row">
        {workingGroupRepresentative.map((el) => (
          <div key={el.name} className="col-md-12" id={`${name}.${el.name}`}>
            <Input
              name={`${name}.${el.name}`}
              labelName={el.label}
              placeholder={el.placeholder}
              ariaLabel={`${name} ${name}.${el.name}`}
              onChange={formik.handleChange}
              requiredMark={true}
              value={
                formik.values.workingGroups[theIndex]
                  .workingGroupRepresentative[`${el.name}`]
              }
              error={
                formik.touched.workingGroups?.[theIndex]
                  ?.workingGroupRepresentative?.[`${el.name}`] &&
                Boolean(
                  formik.errors.workingGroups?.[theIndex]
                    ?.workingGroupRepresentative?.[`${el.name}`]
                )
              }
              helperText={
                formik.touched.workingGroups?.[theIndex]
                  ?.workingGroupRepresentative?.[`${el.name}`] &&
                formik.errors.workingGroups?.[theIndex]
                  ?.workingGroupRepresentative?.[`${el.name}`]
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkingGroupRepresentative;
